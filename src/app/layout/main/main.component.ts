import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CrossWordAppComponent } from '../cross-word-app/cross-word-app.component';
import { AlphabetGameComponent } from '../alphabet-game/alphabet-game.component';
import { SocketService } from '../../services/socket.service'
import { CommonApiService } from '../../services/common-api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { RapidfireGameComponent } from '../rapidfire-game/rapidfire-game.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CrossWordAppComponent, AlphabetGameComponent, DatePipe, CommonModule, ToastrModule, NgxUiLoaderModule, RapidfireGameComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private sokect: SocketService, private api: CommonApiService, private toastr: ToastrService, private loader: NgxUiLoaderService) {

  }
  gridSize = 9; // 10x10 grid
  grid: any[][] = [];
  blankCells: any[] = [];
  clues: any = {
    "across": [],
    "down": []
  }
  alphabetQuestion: any = [];
  startCrossWord: boolean = false;
  startRapidFirgame: boolean = false;
  startAlphbetgame: boolean = false;
  startQuestionANswer: boolean = false;
  start_date: any;
  gameTime: any;
  userName: any = localStorage.getItem('userName')
  private unsubscribe$ = new Subject<void>();
  gameList: any = [];
  userId: any = localStorage.getItem('userId');
  rapidFireQuestion: any = [];
  game1: any
  game2: any
  game3: any
  ngOnInit(): void {

    this.getAllGamesDetail();
    // this.getGamesDetail();
    // this.initializeGrid();
    // this.populateGrid();
    // this.findBlankCells();

    this.sokect.getstartGameEvent().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        console.log('Game started with data:', data);
        if (data['type'] == "crossword") {
          // this.startCrossWord = true
          if (((this.game1.user_game_relations && this.game1.user_game_relations.length == 0) || !this.game1.user_game_relations)) {
            // this.gameTime = this.calculateMinitesDiffrent(new Date(), this.game1.end_time);
            this.startCrossWord = true;
          }
        }
        if (data['type'] == "alphabet") {
          if (((this.game2.user_game_relations && this.game2.user_game_relations.length == 0) || !this.game2.user_game_relations)) {
            this.startAlphbetgame = true;
          }
        }
        if (data['type'] == "rapidfire") {
          this.sokect.thirdGameStartEvent('gamestarted');
          this.startRapidFirgame = true;
          setTimeout(() => {
            document.getElementById('A6')?.click();
          }, 3000)
        }

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
        if (data['type'] == "crossword") {
          this.startCrossWord = false
          this.game1['start'] = 0;
          // this.stopGame(this.game1);

        }
        if (data['type'] == "alphabet") {
          this.startAlphbetgame = false;
          this.game2['start'] = 0;
          // this.stopGame(this.game2);

        }
        if (data['type'] == "rapidfire") {
          this.startRapidFirgame = false;
          this.game3['start'] = 0;
          for (let i = 0; i <= 29; i++) {
            const buttonId = 'stopButton' + i;
            const button = document.getElementById(buttonId);
            if (button) {
              button.click();
            }
          }
          // this.stopGameManual(this.game3);

        }

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })

    this.sokect.getThirdGameOverEventBytime().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        // this.stopGameManual(this.game3);
        this.game3['start'] = 0;
        this.startRapidFirgame = false;

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })

    this.sokect.gameActivated().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        let x: any = this.gameList.findIndex((f: any) => f.id == data.id);
        if (x != -1) {
          this.gameList[x]['active'] = 1;
        }

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })
    this.sokect.gameInActivated().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        let x: any = this.gameList.findIndex((f: any) => f.id == data.id);
        if (x != -1) {
          this.gameList[x]['active'] = 0;
        }

      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Observable completed.');
      }
    })

  }


  submitAnswer() {

  }

  initializeGrid(): void {
    // this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = [];

      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i].push({
          cellnumber: j,
          rowNumber: i,
          Hquestion: null,
          Vquestion: null,
          Answer: '',
          isBlanckdCell: true,
          isCompleteCell: false,
          HendCell: null,
          VendCell: null,
          isActive: true,
          showQH: false,
          cellId: i + ',' + j,

        });
        if ((i + 1) == this.gridSize && (j + 1) == this.gridSize) {
          this.checkAnswer()
        }
      }

      // }
    }

  }



  checkAnswer() {
    this.grid.map((f: any, i: number) => {
      f.map((j: any, k: number) => {
        let str = i + ',' + k;
        let index = this.clues.across.findIndex((ele: any) => ele.cell == str);
        if (index != -1) {
          // console.log(this.clues.across[index]['answer'])
          let length = this.clues.across[index]['answerArray'].length;
          for (let x = 0; x <= length - 1; x++) {
            if (this.clues.across[index]['isCompleteQuestion']) {
              this.grid[i][k + x]['value'] = this.clues.across[index]['answerArray'][x]
              this.grid[i][k + x]['isCompleteCell'] = true;
            }
            this.grid[i][k + x]['answer'] = this.clues.across[index]['answerArray'][x]
            this.grid[i][k + x]['isBlanckdCell'] = false;
            // this.grid[i][k + x]['Vquestion'] = false;
            this.grid[i][k + x]['Hquestion'] = this.clues.across[index]['clue'];
            this.grid[i][k + x]['HanswerArray'] = this.clues.across[index]['answerArray'];
            this.grid[i][k + x]['nextHCell'] = (x == length - 1) ? null : x + 1;
            j['qnumber'] = this.clues.across[index]['number']
          }

        }
        let index2 = this.clues.down.findIndex((ele: any) => ele.cell == str);
        if (index2 != -1) {
          // console.log(this.clues.down[index2]['answer'])
          let length = this.clues.down[index2]['answerArray'].length;
          for (let x = 0; x <= length - 1; x++) {
            if (this.clues.down[index2]['isCompleteQuestion']) {
              this.grid[i + x][k]['value'] = this.clues.down[index2]['answerArray'][x]
              this.grid[i + x][k]['isCompleteCell'] = true;
            }
            this.grid[i + x][k]['answer'] = this.clues.down[index2]['answerArray'][x]
            this.grid[i + x][k]['isBlanckdCell'] = false;
            this.grid[i + x][k]['Vquestion'] = this.clues.down[index2]['clue'];
            this.grid[i + x][k]['VanswerArray'] = this.clues.down[index2]['answerArray'];
            this.grid[i + x][k]['nextVCell'] = (x == length - 1) ? null : x + 1;
            j['qnumber'] = this.clues.down[index2]['number'];

          }

        }
      })
    })
  }

  getGamesDetail() {

    this.api.allgetMethod('user/getGamesDetail').subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          if (res.data && res.data.length > 0) {
            let gameDetail = res.data[0];
            // if (gameDetail && gameDetail.games_questions && gameDetail.type == 'crossword') {
            //   this.start_date = gameDetail.start_time
            //   if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
            //     this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time)
            //     let ifGameStarted = gameDetail.start
            //     if (ifGameStarted) {
            //       this.gameTime = this.calculateMinitesDiffrent(new Date(), gameDetail.end_time);
            //       this.startCrossWord = true;
            //     }
            //     gameDetail.games_questions.forEach((ele: any, i: number) => {
            //       let value = null
            //       if (ele.user_games_question_answers && ele.user_games_question_answers.length > 0) {
            //         value = ele.user_games_question_answers[0]['answer'];
            //         ele.value = value;
            //         ele.isCompleteCell = true;
            //         ele.isCompleteQuestion = true;
            //       }
            //       if (ele.orientation == "down") {
            //         let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
            //         this.clues.down.push(obj);
            //       } else {
            //         let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
            //         this.clues.across.push(obj);
            //       }

            //       if (gameDetail.games_questions.length == i + 1) {
            //         this.clues.across.map((f: any) => {
            //           f['completed'] = f['isCompleteQuestion'] ? f['isCompleteQuestion'] : false;
            //           let length = f['answerArray'].length;
            //           f['allCellList'] = [];
            //           let k = parseInt(f.cell.split(',')[1])
            //           let i = parseInt(f.cell.split(',')[0])
            //           for (let x = 0; x <= length - 1; x++) {

            //             let str = i + ',' + (k + x);
            //             f['allCellList'].push(str)

            //           }
            //         })
            //         this.clues.down.map((f: any) => {
            //           // f['completed'] = false;
            //           f['completed'] = f['isCompleteQuestion'] ? f['isCompleteQuestion'] : false;
            //           let length = f['answerArray'].length;
            //           f['allCellList'] = [];
            //           let k = parseInt(f.cell.split(',')[1])
            //           let i = parseInt(f.cell.split(',')[0])
            //           for (let x = 0; x <= length - 1; x++) {
            //             let str = (i + x) + ',' + k
            //             f['allCellList'].push(str);

            //           }
            //         })
            //         this.initializeGrid()
            //       }
            //     });
            //   } else {
            //     gameDetail['completed'];
            //     this.startCrossWord = false;
            //   }
            // }
            // if (gameDetail && gameDetail.games_questions && gameDetail.type == 'alphabet') {
            //   this.start_date = gameDetail.start_time
            //   if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
            //     this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time)
            //     let ifGameStarted = this.checkIfGameIsStarted(gameDetail.start_time, gameDetail.end_time)
            //     if (ifGameStarted) {
            //       this.gameTime = this.calculateMinitesDiffrent(new Date(), gameDetail.end_time);
            //       console.log('gametime', this.gameTime)
            //       this.startAlphbetgame = true;
            //     }
            //     gameDetail.games_questions.forEach((ele: any, i: number) => {
            //       if (ele.user_games_question_answers && ele.user_games_question_answers.length > 0) {
            //         ele['isComplete'] = true;
            //         ele['value'] = ele.user_games_question_answers[0]['answer']
            //       }
            //       let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
            //       this.alphabetQuestion.push(obj);
            //       // isComplete = true;
            //     })
            //   } else {
            //     gameDetail['completed'];
            //     this.startAlphbetgame = false;
            //   }
            // }
            // user_games_question_answers
          }
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err: any) => {
        this.loader.stopLoader('login');
        this.toastr.error(err['message'], '');
      },
    });
  }

  calculateMinitesDiffrent(start: any, end: any) {
    const date1: any = new Date(start);
    const date2: any = new Date(end);

    // Get the difference in milliseconds
    const diffInMs = date2 - date1;

    // Convert the difference from milliseconds to minutes
    const diffInMinutes = diffInMs / (1000 * 60);

    return diffInMinutes;
  }

  ngOnDestroy(): void {
    // Trigger unsubscribe to stop receiving events
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  checkIfGameIsStarted(date1: any, date2: any) {
    // Convert string to Date objects
    const startTime = new Date(date1);
    const endTime = new Date(date2);

    // Get current UTC time
    const currentTime = new Date();

    // Check if current time is within the range
    if (currentTime > startTime && currentTime < endTime) {
      console.log('worddk')
      return true
    }
    return false
  }

  onComplete(event: any) {
    this.startCrossWord = false;
  }
  onCompleteAlphabetGame(event: any) {
    this.startAlphbetgame = false;
  }


  getAllGamesDetail() {

    this.api.allgetMethod('user/getAllGamesDetail').subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          if (res.data && res.data.length > 0) {
            this.gameList = res.data;
            // let gameDetail = res.data[0];
            this.gameList.map((gameDetail: any) => {
              if (gameDetail && gameDetail.games_questions && gameDetail.type == 'crossword') {
                this.game1 = gameDetail;
                this.start_date = gameDetail.start_time
                if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
                  this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time);
                  let ifGameStarted = gameDetail.start;
                  gameDetail.games_questions.forEach((ele: any, i: number) => {
                    let value = null
                    if (ele.user_games_question_answers && ele.user_games_question_answers.length > 0) {
                      value = ele.user_games_question_answers[0]['answer'];
                      ele.value = value;
                      ele.isCompleteCell = true;
                      ele.isCompleteQuestion = true;
                    }
                    if (ele.orientation == "down") {
                      let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
                      this.clues.down.push(obj);
                    } else {
                      let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
                      this.clues.across.push(obj);
                    }

                    if (gameDetail.games_questions.length == i + 1) {
                      this.clues.across.map((f: any) => {
                        f['completed'] = f['isCompleteQuestion'] ? f['isCompleteQuestion'] : false;
                        let length = f['answerArray'].length;
                        f['allCellList'] = [];
                        let k = parseInt(f.cell.split(',')[1])
                        let i = parseInt(f.cell.split(',')[0])
                        for (let x = 0; x <= length - 1; x++) {

                          let str = i + ',' + (k + x);
                          f['allCellList'].push(str)

                        }
                      })
                      this.clues.down.map((f: any) => {
                        // f['completed'] = false;
                        f['completed'] = f['isCompleteQuestion'] ? f['isCompleteQuestion'] : false;
                        let length = f['answerArray'].length;
                        f['allCellList'] = [];
                        let k = parseInt(f.cell.split(',')[1])
                        let i = parseInt(f.cell.split(',')[0])
                        for (let x = 0; x <= length - 1; x++) {
                          let str = (i + x) + ',' + k
                          f['allCellList'].push(str);

                        }
                      })
                      this.initializeGrid()
                    }
                  });
                  if (ifGameStarted && ((gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) || !gameDetail.user_game_relations)) {
                    this.gameTime = this.calculateMinitesDiffrent(new Date(), gameDetail.end_time);
                    this.startCrossWord = true;
                  }
                } else {
                  gameDetail['completed'];
                  this.startCrossWord = false;
                }
              }
              if (gameDetail && gameDetail.games_questions && gameDetail.type == 'alphabet') {
                this.game2 = gameDetail;
                this.start_date = gameDetail.start_time
                if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
                  this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time);
                  let ifGameStarted = gameDetail.start;
                  // let ifGameStarted = this.checkIfGameIsStarted(gameDetail.start_time, gameDetail.end_time)
                  if (ifGameStarted && ((gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) || !gameDetail.user_game_relations)) {
                    this.gameTime = this.calculateMinitesDiffrent(new Date(), gameDetail.end_time);
                    console.log('gametime', this.gameTime)
                    this.startAlphbetgame = true;
                  }
                  gameDetail.games_questions.forEach((ele: any, i: number) => {
                    if (ele.user_games_question_answers && ele.user_games_question_answers.length > 0) {
                      ele['isComplete'] = true;
                      ele['value'] = ele.user_games_question_answers[0]['answer']
                    }
                    let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
                    this.alphabetQuestion.push(obj);
                    // isComplete = true;
                  })
                } else {
                  gameDetail['completed'];
                  this.startAlphbetgame = false;
                }
              }
              if (gameDetail && gameDetail.games_questions && gameDetail.type == 'rapidfire') {
                this.game3 = gameDetail;
                this.start_date = gameDetail.start_time
                if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
                  // this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time);
                  gameDetail.games_questions.forEach((ele: any, i: number) => {
                    if (ele.user_games_question_answers && ele.user_games_question_answers.length > 0) {
                      ele['isComplete'] = true;
                      // ele['isComplete'] = true;
                      if (ele.user_games_question_answers[0]['ans'] == true) {
                        ele['isRight'] = true;
                      } else {
                        ele['isWrong'] = true;
                      }
                      ele['userAnswer'] = ele.user_games_question_answers[0]['answer'];
                      ele['value'] = ele.user_games_question_answers[0]['answer']
                    }
                    let obj = Object.assign({}, ele, { answerArray: JSON.parse(ele.answerArray) })
                    this.rapidFireQuestion.push(obj);
                    // isComplete = true;
                  })
                  let ifGameStarted = gameDetail.start;
                  if (ifGameStarted) {
                    this.startRapidFirgame = true;
                    setTimeout(() => {
                      this.sokect.userJoinThirdGame({ userId: this.userId });

                    }, 200)
                  }
                } else {
                  gameDetail['completed'];
                  this.startRapidFirgame = false;
                }

              }
            })


            // user_games_question_answers
          }
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err: any) => {
        this.loader.stopLoader('login');
        this.toastr.error(err['message'], '');
      },
    });
  }

  startGame(item: any) {

    this.api.allPostMethod('user/startGame', { id: item.id }).subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          // this.sokect.startGame({ id: item.id })
          console.log(res['data'])

          let obj = {
            id: res['data'].id,
            type: res['data'].type,
            start_time: res['data'].start_time,
            end_time: res['data'].end_time,
            active: res['data'].active,
            start: res['data'].start,
            time: res['data'].time,
          }
          this.sokect.startGame(obj);
          item['start'] = 1;
          // setTimeout(() => {
          //   document.getElementById('A6')?.click();
          // }, 3000)
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err: any) => {

        this.loader.stopLoader('login');
        if (err.error && err.error.error == true) {
          this.toastr.error(err.error['message'], '');

        } else {
          this.toastr.error(err['message'], '');
        }
      },
    });
  }

  stopGame(item: any) {
    this.api.allPostMethod('user/stopGame', { id: item.id }).subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          item['start'] = 0;
          this.sokect.endGame(item);
          if (item['type'] == "rapidfire") {
            this.sokect.ThirdgameOverByadmin(item)
          }
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err: any) => {
        console.log(err)
        this.loader.stopLoader('login');
        if (err.error && err.error.error == true) {
          this.toastr.error(err.error['message'], '');

        } else {
          this.toastr.error(err['message'], '');
        }
      },
    });
  }

  stopGameManual(item: any) {
    this.api.allPostMethod('user/stopGame', { id: item.id }).subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          item['start'] = 0;
          // this.sokect.endGame(item);
          if (item['type'] == "rapidfire") {
            // this.sokect.ThirdgameOverByadmin(item)
          }
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err: any) => {
        console.log(err)
        this.loader.stopLoader('login');
        if (err.error && err.error.error == true) {
          this.toastr.error(err.error['message'], '');

        } else {
          this.toastr.error(err['message'], '');
        }
      },
    });
  }

  ActiveInActiveGame(item: any, active: boolean) {
    if (active == true) {
      this.api.allPostMethod('user/activeGame', { id: item.id }).subscribe({
        next: (res: any) => {
          this.loader.stopLoader('login');
          if (res['error'] != true) {
            this.sokect.activeGame({ id: item.id })
            // item['active'] = 1;
          }
          else {
            this.toastr.error(res.message || res.error, '');
          }
        },
        error: (err: any) => {

          this.loader.stopLoader('login');
          if (err.error && err.error.error == true) {
            this.toastr.error(err.error['message'], '');

          } else {
            this.toastr.error(err['message'], '');
          }
        },
      });
    } else {
      this.api.allPostMethod('user/inActiveGame', { id: item.id }).subscribe({
        next: (res: any) => {
          this.loader.stopLoader('login');
          if (res['error'] != true) {
            this.sokect.inActiveGame({ id: item.id })
            // this.sokect.startGame({ id: item.id })
            // item['active'] = 0;
          }
          else {
            this.toastr.error(res.message || res.error, '');
          }
        },
        error: (err: any) => {

          this.loader.stopLoader('login');
          if (err.error && err.error.error == true) {
            this.toastr.error(err.error['message'], '');

          } else {
            this.toastr.error(err['message'], '');
          }
        },
      });
    }

  }


  onCompleteRapidfiregame(event: any) {
    this.startRapidFirgame = false;

  }
}
