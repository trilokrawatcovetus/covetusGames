import { Component, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
const alphabetArray: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
@Component({
  selector: 'app-alphabet-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alphabet-game.component.html',
  styleUrl: './alphabet-game.component.css'
})

export class AlphabetGameComponent {
  @Input() alphabetQuestion!: any;
  keys: any = [];
  selecteQuestion: any;
  currentIndex: any;
  alphabetArray: any = alphabetArray;
  @Input() timer!: any;
  isCompletd = output<Boolean>();
  timeRemaining: number = 0; // In seconds
  timerSubscription!: Subscription;
  completed: boolean = false;
  constructor(private timerService: TimerService, private soketService: SocketService) {

  }
  ngOnInit() {
    // this.keys = Object.keys(this.alphabetQuestion);
    if (this.timer) {
      console.log(alphabetArray)
      this.timerService.startTimer(this.timer);

      // Subscribe to the timer value
      this.timerSubscription = this.timerService.getTimerValue().subscribe((remainingTime) => {
        this.timeRemaining = remainingTime;
        console.log(this.timeRemaining, remainingTime)
      });

    }
    this.currentIndex = 0;
    this.selecteQuestion = this.alphabetQuestion[0]
  }


  // @Input() clues!: any;
  onCLickvalue(key: any, i: any) {
    if (key && key.isComplete == true) {
      return false;
    }
    // console.log(this.selecteQuestion && this.selecteQuestion.isComplete)
    this.selecteQuestion = key;
    this.currentIndex = i;
    return true;
  }

  onSubmit() {
    console.log(this.selecteQuestion);
    this.selecteQuestion.isComplete = true;


    let index = this.alphabetQuestion.findIndex((f: any) => f.isComplete != true);
    console.log(index)
    if (index != -1) {
      this.goToNextKey(this.currentIndex);
    }
  }

  goToNextKey(index: any) {
    let nextIndex = index + 1;
    let length = this.alphabetQuestion.length;
    if (nextIndex >= length) {
      this.goToNextKey(-1);
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
    let length = this.alphabetQuestion.length;
    if (nextIndex == 0) {
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
      this.selecteQuestion.value = '';
    } else {
      this.selecteQuestion.value = (this.selecteQuestion.value ? this.selecteQuestion.value : '') + value
    }
  }

  formatTime(): string {
    console.log(this.timeRemaining)
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
