import { Component, Input, output, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { SocketService } from '../../services/socket.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-rapidfire-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rapidfire-game.component.html',
  styleUrl: './rapidfire-game.component.css'
})
export class RapidfireGameComponent {
  @Input() rapidFireQuestion: any = [];
  keys: any = [];
  selecteQuestion: any;
  currentIndex: any;
  @Input() timer!: any;
  isCompletd = output<Boolean>();
  timeRemaining: number = 0; // In seconds
  timerSubscription!: Subscription;
  completed: boolean = false;
  userId: any = localStorage.getItem('userId');
  private unsubscribe$ = new Subject<void>();
  timervalue!: any;
  updatedQustion: any;
  selectedQuestion: any;
  audio: any;
  totalTime = 10
  constructor(private timerService: TimerService, private sokect: SocketService, private vcr: ViewContainerRef) {
    this.sokect.updateQuestionThirdgame().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        console.log('dfsdfsdf', data)
        this.selectedQuestion = undefined;
        this.selectedQuestion = this.rapidFireQuestion[data.question];
        this.updatedQustion = data.question;
        this.timervalue = data.remainingTime;
        if (data.question % 2 == 0) {
          this.selectedQuestion.audiofile = 'assets/audio/audio1.dat.wav';
        } else {
          this.selectedQuestion.audiofile = 'assets/audio/audio2.wav';
        }
        // document.getElementById('playAudiopause')?.click();
        setTimeout(() => {
          this.audio = new Audio(this.selectedQuestion.audiofile);
          this.audio.play();
        }, 200);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
    this.sokect.updateQuestionThirdgame2().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        if (data.userId == this.userId) {
          console.log('dfsdfsdf', data)
          this.selectedQuestion = undefined;
          this.selectedQuestion = this.rapidFireQuestion[data.question];
          this.updatedQustion = data.question;
          this.timervalue = data.remainingTime;
          if (data.question % 2 == 0) {
            this.selectedQuestion.audiofile = 'assets/audio/audio1.dat.wav';
          } else {
            this.selectedQuestion.audiofile = 'assets/audio/audio2.wav';
          }
          // document.getElementById('playAudiopause')?.click();
          setTimeout(() => {
            this.audio = new Audio(this.selectedQuestion.audiofile);
            this.audio.play();
          }, 100);

        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
    this.sokect.ThirdgameupdateTimer().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        console.log('Game started with data:', data);
        this.timervalue = data;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
    this.sokect.getGameEndMessageByOwner().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        if (this.audio) {
          this.audio.pause();
          this.audio = null;
        }
        // if (data['type'] == "rapidfire") {

        // }

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
  }
  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
    // if (this.timerSubscription) {
    // }\
    this.selecteQuestion = undefined;
    this.rapidFireQuestion = undefined;
    // destroy audio here
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

  }

  saveAnswer(selectedQuestion: any) {
    let result: any = selectedQuestion['userAnswer']
    let question: any = selectedQuestion
    if (selectedQuestion.isComplete == true) {
      return
    }
    selectedQuestion.isComplete = true;
    let ans = false;
    if (question.answer == result) {
      selectedQuestion.isRight = true;
      ans = true;
    } else {
      selectedQuestion.isWrong = true;

    }
    let obj = {
      user_id: this.userId,
      game_master_id: question.game_master_id,
      question_id: question.id,
      answer: result,
      ans: ans
    }

    this.sokect.saverapidFire(obj);


  }

  selectAnswer(item: any) {
    if (this.selectedQuestion.isComplete == true) {
      return
    }
    this.selectedQuestion['userAnswer'] = item;

  }
}
