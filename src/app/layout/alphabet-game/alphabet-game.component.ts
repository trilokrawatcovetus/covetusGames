import { Component, Input, output, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
const alphabetArray: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', ','
];
const alphabetArray2: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
@Component({
  selector: 'app-alphabet-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alphabet-game.component.html',
  styleUrl: './alphabet-game.component.css'
})

export class AlphabetGameComponent {
  @Input() alphabetQuestion!: any;
  keys: any = [];
  selecteQuestion: any;
  currentIndex: any;
  alphabetArray: any = alphabetArray;
  alphabetArray2: any = alphabetArray2;
  @Input() timer!: any;
  isCompletd = output<Boolean>();
  timeRemaining: number = 0; // In seconds
  timerSubscription!: Subscription;
  completed: boolean = false;
  userId: any = localStorage.getItem('userId');
  remainingTime: any;
  constructor(private timerService: TimerService, private soketService: SocketService, private vcr: ViewContainerRef) {

  }
  ngOnInit() {
    // this.keys = Object.keys(this.alphabetQuestion);
    // if (this.timer) {
    //   this.timerService.startTimer(this.timer);

    //   // Subscribe to the timer value
    //   this.timerSubscription = this.timerService.getTimerValue().subscribe((remainingTime) => {
    //     this.timeRemaining = remainingTime;
    //     let time: any = remainingTime
    //     if (this.timeRemaining != -1 && this.timeRemaining < 1) {
    //       this.isCompletd.emit(true);
    //     }
    //   });

    // }
    console.log(this.alphabetQuestion)
    this.soketService.timerfor2games().pipe().subscribe({
      next: (data: any) => {
        this.remainingTime = data.timeresult;
        if (data.timeresult == false) {
          this.finsh();

        }

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })

    let index = this.alphabetQuestion.findIndex((f: any) => f.isComplete != true);
    if (index != -1) {
      this.currentIndex = index;
      this.selecteQuestion = this.alphabetQuestion[index];
      this.selecteQuestion.value = this.selecteQuestion.lable.toUpperCase();;
    } else {
      this.completed = true;
    }

    console.log(' this.alphabetQuestion', this.alphabetQuestion)
  }


  // @Input() clues!: any;
  onCLickvalue(key: any, i: any) {
    if (key && key.isComplete == true) {
      return false;
    }
    // console.log(this.selecteQuestion && this.selecteQuestion.isComplete)
    this.selecteQuestion = key;
    this.selecteQuestion.value = this.selecteQuestion.lable.toUpperCase();
    this.currentIndex = i;
    return true;
  }

  onSubmit() {
    if (this.selecteQuestion && this.selecteQuestion.value) {
      let answerIndex = this.selecteQuestion.answerArray.findIndex((f: any) => f.toLowerCase() == this.selecteQuestion.value.toLowerCase());
      let ans = false;
      if (answerIndex != -1) {
        ans = true;
      }
      this.selecteQuestion.isComplete = true;
      let obj = {
        user_id: this.userId,
        game_master_id: this.selecteQuestion.game_master_id,
        question_id: this.selecteQuestion.id,
        answer: this.selecteQuestion.value,
        ans: ans
      }
      this.soketService.saveAlphabetAns(obj);
      let index = this.alphabetQuestion.findIndex((f: any) => f.isComplete != true);
      console.log(index)
      if (index != -1) {
        this.goToNextKey(this.currentIndex);
      } else {
        this.checkAllValueSave()
      }
    }
  }

  goToNextKey(index: any) {
    let nextIndex = index + 1;
    let length = this.alphabetQuestion.length;
    if (nextIndex >= length) {
      return;
    } else {
      if (this.alphabetQuestion[nextIndex].isComplete == true) {
        this.goToNextKey(nextIndex);
      } else {
        this.onCLickvalue(this.alphabetQuestion[nextIndex], nextIndex);
      }
    }
  }

  goToPreKey(index: any) {
    let nextIndex = index - 1;
    console.log(index)
    let length = this.alphabetQuestion.length;
    console.log(this.alphabetQuestion.length)
    if (nextIndex == -1) {
      this.goToPreKey(this.alphabetQuestion.length);
    } else {
      if (this.alphabetQuestion[nextIndex].isComplete == true) {
        this.goToPreKey(nextIndex);
      } else {
        this.onCLickvalue(this.alphabetQuestion[nextIndex], nextIndex);
      }
    }
  }

  onKeywordClick(value: any) {
    if (value == 'cross') {
      if (this.selecteQuestion.value) {
        this.selecteQuestion.value = this.selecteQuestion.value.slice(0, -1);

      }
    } else {
      let odlValue = (this.selecteQuestion.value != undefined && this.selecteQuestion.value != null) ? this.selecteQuestion.value : '';
      this.selecteQuestion.value = odlValue + value;
    }
  }

  formatTime(): string {
    const totalSeconds = Math.floor(this.timeRemaining); // Discard milliseconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  checkAllValueSave() {
    let x = this.alphabetQuestion.findIndex((f: any) => f.isComplete != true);
    // if (x == -1) {
    //   this.completed = true;
    //   this.finsh()
    // }

  }


  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  destroyComponent(): void {
    this.vcr.clear(); // This will destroy the component by clearing the ViewContainerRef
  }

  onClickAlphabet(item: any, index: any) {
    if (item.isComplete) {
      return false
    }

    this.currentIndex = index;
    this.selecteQuestion = this.alphabetQuestion[index];
    return
  }

  finsh() {
    let obj = {
      user_id: this.userId,
      game_master_id: this.alphabetQuestion[0]['game_master_id'],
      completed: true,
      time: this.remainingTime ? this.remainingTime : 0
    }
    this.soketService.completeGame(obj)
    this.isCompletd.emit(true);
  }

}

