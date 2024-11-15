import { Component, ElementRef, Input, output, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
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
  totalTime = 60;
  firstVideoloadedflag: boolean = false;
  // audiolist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ];
  // audioPlayers: any;
  playername = localStorage.getItem("userName");
  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  constructor(private timerService: TimerService, private sokect: SocketService, private vcr: ViewContainerRef) {


    this.sokect.updateQuestionThirdgame().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        // console.log('dfsdfsdf', this.rapidFireQuestion)
        if (data.question) {
          this.selectedQuestion = undefined;
          this.selectedQuestion = this.rapidFireQuestion[data.question - 1];
          this.updatedQustion = data.question;

          this.timervalue = data.remainingTime;
          // if (data.question != 1) {
          for (let i = 0; i <= 30; i++) {
            const buttonId = 'stopButton' + i;
            const button = document.getElementById(buttonId);
            if (button) {
              button.click();
            }
            if (i == 30) {
              setTimeout(() => {
                console.log('playButton', this.selectedQuestion.audiofile)
                document.getElementById(this.selectedQuestion.audiofile)?.click();
              }, 1000)
            }
          }
          // for (let i = 0; i <= 30; i++) {

          //   const buttonId = 'mute' + i;
          //   const button = document.getElementById(buttonId);
          //   if (button) {
          //     button.click();
          //   }
          // }
          // setTimeout(() => {
          //   console.log('playButton', this.selectedQuestion.audiofile)
          //   document.getElementById(this.selectedQuestion.audiofile)?.click();
          // }, 1000)
          // }
        }

        // document.getElementById('playAudiopause')?.click();
        // if (this.audio) {
        //   this.audio.currentTime = 0;
        //   this.audio.pause();
        //   this.audio = null;
        // }
        // setTimeout(() => {
        //   this.audio = new Audio(this.selectedQuestion.audiofile);
        //   this.audio.load();
        //   this.audio.play();
        // }, 200);
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
          if (data.question) {
            this.selectedQuestion = undefined;
            this.selectedQuestion = this.rapidFireQuestion[data.question - 1];
            this.updatedQustion = data.question;
            this.timervalue = data.remainingTime;

            for (let i = 0; i <= 30; i++) {
              const buttonId = 'stopButton' + i;
              const button = document.getElementById(buttonId);
              if (button) {
                button.click();
              }
              if (i == 30) {
                setTimeout(() => {
                  console.log('playButton', this.selectedQuestion.audiofile)
                  document.getElementById(this.selectedQuestion.audiofile)?.click();
                }, 1000)
              }
            }

          }


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
        // if (this.audio) {
        //   this.audio.pause();
        //   this.audio = null;
        // }
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
    this.sokect.closeAudio().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        // if (this.audio) {
        //   this.audio.currentTime = 0;
        //   this.audio.pause();
        //   this.audio = null;
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

  ngOnInit() {
    // console.log(document.getElementById('A6'))
    // document.getElementById('A6')?.click();
  }

  firstVideoLoaded() {
    this.firstVideoloadedflag = true
    if (this.selectedQuestion.audiofile == 'A6') {
      console.log(document.getElementById('A6'))
      document.getElementById('A6')?.click();
    }
  }
  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
    // if (this.timerSubscription) {
    // }\
    this.selecteQuestion = undefined;
    this.rapidFireQuestion = undefined;
    // destroy audio here
    // if (this.audio) {
    //   this.audio.currentTime = 0;
    //   this.audio.pause();
    //   this.audio = null;
    // }

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

  // playAudio(video1: any): void {
  // }

}
