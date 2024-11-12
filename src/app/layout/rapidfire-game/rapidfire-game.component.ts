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
            const audioElement = new Audio(this.selectedQuestion.audiofile);
            audioElement.play();
          }, 200);

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
  }
  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
    // if (this.timerSubscription) {
    // }\
    this.selecteQuestion = undefined;
    this.rapidFireQuestion = undefined;
    this.audio?.pause();

  }

  saveAnswer(selectedQuestion: any) {
    let result: any = selectedQuestion['userAnswer']
    let question: any = selectedQuestion
    if (selectedQuestion.isComplete == true) {
      return
    }
    selectedQuestion.isComplete = true;
    if (question.answer == result) {
      selectedQuestion.isRight = true;
      let obj = {
        user_id: this.userId,
        game_master_id: question.game_master_id,
        question_id: question.id,
        answer: result,

      }
      this.sokect.saverapidFire(obj);
    } else {
      selectedQuestion.isRight = false;
    }

  }

  selectAnswer(item: any) {
    if (this.selectedQuestion.isComplete == true) {
      return
    }
    this.selectedQuestion['userAnswer'] = item;

  }
}
