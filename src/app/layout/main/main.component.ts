import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CrossWordAppComponent } from '../cross-word-app/cross-word-app.component';
import { AlphabetGameComponent } from '../alphabet-game/alphabet-game.component';
import { SocketService } from '../../services/socket.service'
import { CommonApiService } from '../../services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CrossWordAppComponent, AlphabetGameComponent, DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private sokect: SocketService, private api: CommonApiService, private toastr: ToastrService, private loader: NgxUiLoaderService) {

  }
  gridSize = 10; // 10x10 grid
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
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getGamesDetail();
    // this.initializeGrid();
    // this.populateGrid();
    // this.findBlankCells();

    this.sokect.getstartGameEvent().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: any) => {
        console.log('Game started with data:', data);
        if (data['type'] == "crossword") {
          this.startCrossWord = true
        }
        if (data['type'] == "alphabet") {
          this.startAlphbetgame = true;
        }
        if (data['type'] == "rapidfire") {
          this.startRapidFirgame = true;
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
        if ((i + 1) == 10 && (j + 1) == 10) {
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
            if (gameDetail && gameDetail.games_questions && gameDetail.type == 'crossword') {
              this.start_date = gameDetail.start_time
              if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
                this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time)
                let ifGameStarted = this.checkIfGameIsStarted(gameDetail.start_time, gameDetail.end_time)
                if (ifGameStarted) {
                  this.gameTime = this.calculateMinitesDiffrent(new Date(), gameDetail.end_time);
                  this.startCrossWord = true;
                }
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
              } else {
                gameDetail['completed'];
                this.startCrossWord = false;
              }
            }
            if (gameDetail && gameDetail.games_questions && gameDetail.type == 'alphabet') {
              this.start_date = gameDetail.start_time
              if (gameDetail.user_game_relations && gameDetail.user_game_relations.length == 0) {
                this.gameTime = this.calculateMinitesDiffrent(gameDetail.start_time, gameDetail.end_time)
                let ifGameStarted = this.checkIfGameIsStarted(gameDetail.start_time, gameDetail.end_time)
                if (ifGameStarted) {
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
    debugger;
    this.startAlphbetgame = false;
  }
}
