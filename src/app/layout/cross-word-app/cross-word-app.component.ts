import { Component, Input, OnDestroy, output, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { TimerService } from '../../services/timer.service';
import { Subscription, takeUntil } from 'rxjs';
import { isFormGroup } from '@angular/forms';

@Component({
  selector: 'app-cross-word-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cross-word-app.component.html',
  styleUrl: './cross-word-app.component.css'
})


export class CrossWordAppComponent {
  @Input() grid!: any[][];
  @Input() clues!: any;
  @Input() timer!: any;
  isCompletd = output<Boolean>();
  userId: any = localStorage.getItem('userId')
  barakhadi: any = [
    "अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "अं", "अः", "ऋ",
    "क", "का", "कि", "की", "कु", "कू", "के", "कै", "को", "कौ", "कं", "कः",
    "ख", "खा", "खि", "खी", "खु", "खू", "खे", "खै", "खो", "खौ", "खं", "खः",
    "ग", "गा", "गि", "गी", "गु", "गू", "गे", "गै", "गो", "गौ", "गं", "गः",
    "घ", "घा", "घि", "घी", "घु", "घू", "घे", "घै", "घो", "घौ", "घं", "घः",
    "ङ", "ङा", "ङि", "ङी", "ङु", "ङू", "ङे", "ङै", "ङो", "ङौ", "ङं", "ङः",
    "च", "चा", "चि", "ची", "चु", "चू", "चे", "चै", "चो", "चौ", "चं", "चः",
    "छ", "छा", "छि", "छी", "छु", "छू", "छे", "छै", "छो", "छौ", "छं", "छः",
    "ज", "जा", "जि", "जी", "जु", "जू", "जे", "जै", "जो", "जौ", "जं", "जः",
    "झ", "झा", "झि", "झी", "झु", "झू", "झे", "झै", "झो", "झौ", "झं", "झः",
    "ञ", "ञा", "ञि", "ञी", "ञु", "ञू", "ञे", "ञै", "ञो", "ञौ", "ञं", "ञः",
    "ट", "टा", "टि", "टी", "टु", "टू", "टे", "टै", "टो", "टौ", "टं", "टः",
    "ठ", "ठा", "ठि", "ठी", "ठु", "ठू", "ठे", "ठै", "ठो", "ठौ", "ठं", "ठः",
    "ड", "डा", "डि", "डी", "डु", "डू", "डे", "डै", "डो", "डौ", "डं", "डः",
    "ढ", "ढा", "ढि", "ढी", "ढु", "ढू", "ढे", "ढै", "ढो", "ढौ", "ढं", "ढः",
    "ण", "णा", "णि", "णी", "णु", "णू", "णे", "णै", "णो", "णौ", "णं", "णः",
    "त", "ता", "ति", "ती", "तु", "तू", "ते", "तै", "तो", "तौ", "तं", "तः",
    "थ", "था", "थि", "थी", "थु", "थू", "थे", "थै", "थो", "थौ", "थं", "थः",
    "द", "दा", "दि", "दी", "दु", "दू", "दे", "दै", "दो", "दौ", "दं", "दः",
    "ध", "धा", "धि", "धी", "धु", "धू", "धे", "धै", "धो", "धौ", "धं", "धः",
    "न", "ना", "नि", "नी", "नु", "नू", "ने", "नै", "नो", "नौ", "नं", "नः",
    "प", "पा", "पि", "पी", "पु", "पू", "पे", "पै", "पो", "पौ", "पं", "पः",
    "फ", "फा", "फि", "फी", "फु", "फू", "फे", "फै", "फो", "फौ", "फं", "फः",
    "ब", "बा", "बि", "बी", "बु", "बू", "बे", "बै", "बो", "बौ", "बं", "बः",
    "भ", "भा", "भि", "भी", "भु", "भू", "भे", "भै", "भो", "भौ", "भं", "भः",
    "म", "मा", "मि", "मी", "मु", "मू", "मे", "मै", "मो", "मौ", "मं", "मः",
    "य", "या", "यि", "यी", "यु", "यू", "ये", "यै", "यो", "यौ", "यं", "यः",
    "र", "रा", "रि", "री", "रु", "रू", "रे", "रै", "रो", "रौ", "रं", "रः",
    "ल", "ला", "लि", "ली", "लु", "लू", "ले", "लै", "लो", "लौ", "लं", "लः",
    "व", "वा", "वि", "वी", "वु", "वू", "वे", "वै", "वो", "वौ", "वं", "वः",
    "श", "शा", "शि", "शी", "शु", "शू", "शे", "शै", "शो", "शौ", "शं", "शः",
    "ष", "षा", "षि", "षी", "षु", "षू", "षे", "षै", "षो", "षौ", "षं", "षः",
    "स", "सा", "सि", "सी", "सु", "सू", "से", "सै", "सो", "सौ", "सं", "सः",
    "ह", "हा", "हि", "ही", "हु", "हू", "हे", "है", "हो", "हौ", "हं", "हः",
    "क्ष", "क्षा", "क्षि", "क्षी", "क्षु", "क्षू", "क्षे", "क्षै", "क्षो", "क्षौ", "क्षं", "क्षः",
    "त्र", "त्रा", "त्रि", "त्री", "त्रु", "त्रू", "त्रे", "त्रै", "त्रो", "त्रौ", "त्रं", "त्रः",
    "ज्ञ", "ज्ञा", "ज्ञि", "ज्ञी", "ज्ञु", "ज्ञू", "ज्ञे", "ज्ञै", "ज्ञो", "ज्ञौ", "ज्ञं", "ज्ञः"
  ];
  selectedQ: any;
  selectedCell: any;
  keyWord: any = []
  completed: boolean = false;
  timeRemaining: number = 0; // In seconds
  timerSubscription!: Subscription;
  previousQ: any = null;
  remainingTime: any;
  playername = localStorage.getItem("userName");
  constructor(private socket: SocketService, private timerService: TimerService, private vcr: ViewContainerRef) {

  }

  ngOnInit() {
    setTimeout(() => {

      // console.log(JSON.stringify(this.clues))
      // console.log(JSON.stringify(this.grid))
      let x = this.clues['across'].findIndex((f: any) => f.completed == false);
      if (x != -1) {
        let id = this.clues['across'][x]['cell'];
        document.getElementById(id)?.click()
      } else {
        let x = this.clues['down'].findIndex((f: any) => f.completed == false);
        if (x != -1) {
          let id = this.clues['down'][x]['cell'];
          document.getElementById(id)?.click()
        }
      }
    }, 1000);

    // if (this.timer) {
    //   this.timerService.startTimer(this.timer);

    // Subscribe to the timer value
    // this.timerSubscription = this.timerService.getTimerValue().subscribe((remainingTime) => {
    //   this.timeRemaining = remainingTime;
    //   if (this.timeRemaining != -1 && this.timeRemaining < 1) {
    //   }
    // });



    this.socket.timerfor2games().pipe().subscribe({
      next: (data: any) => {
        this.remainingTime = data.timeresult;
        if (data.timeresult == false) {
          // this.isCompletd.emit(true);
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

  }
  clickonCell(cell: any, key: any) {
    if (cell && cell.isBlanckdCell == true) {
      return;
    }
    if (this.completed == true) {
      return;
    }
    if (key === '') {
      if (cell.isCompleteCell != true) {
        cell.value = '';
      }
      if (cell.isCompleteCell) {

        if (cell.Hquestion && cell.Vquestion) {
          cell.showQH = !cell.showQH;
          if (cell.Hquestion) {
            cell.showQH = true;
            let index = this.clues['across'].findIndex((x: any) => x.clue == cell.Hquestion);
            this.checkNextCellHorizonatal(index, cell.rowNumber, cell.cellnumber);

          }
          if (cell.Vquestion) {
            cell.showQH = false;
            let Vindex = this.clues['down'].findIndex((x: any) => x.clue == cell.Vquestion);
            this.checkNextCellVertical(Vindex, cell.rowNumber, cell.cellnumber);

          }
        } else {
          if (cell.Hquestion) {
            cell.showQH = true;
            let index = this.clues['across'].findIndex((x: any) => x.clue == cell.Hquestion);

            this.checkNextCellHorizonatal(index, cell.rowNumber, cell.cellnumber);

          }
          if (cell.Vquestion) {
            cell.showQH = false;
            let Vindex = this.clues['down'].findIndex((x: any) => x.clue == cell.Vquestion);
            this.checkNextCellVertical(Vindex, cell.rowNumber, cell.cellnumber);
          }

        }
      }
      if ((cell.isCompleteCell == false)) {
        if (cell.Hquestion && cell.Vquestion) {
          cell.showQH = !cell.showQH;
          this.selectedCell = cell;
        } else {
          if (cell.Hquestion) {
            cell.showQH = true;
            this.selectedCell = cell;
          }
          if (cell.Vquestion) {
            cell.showQH = false;
            this.selectedCell = cell;
          }

        }
        let currentQ;
        if (this.selectedCell && this.selectedCell.showQH) {
          currentQ = this.selectedCell.Hquestion
        }
        if (this.selectedCell && !this.selectedCell.showQH) {
          currentQ = this.selectedCell.Vquestion
        }
        if (this.previousQ != currentQ) {
          this.previousQ = this.selectedCell.showQH ? this.selectedCell.Hquestion : this.selectedCell.Vquestion;
          let answerlist = this.selectedCell.showQH ? this.selectedCell.HanswerArray : this.selectedCell.VanswerArray;

          this.getRandomValues(this.barakhadi, answerlist, 18)
        }
        // this.getRandomValues(this.barakhadi, [this.selectedCell.answer], 24)
      }
    } else {
      cell.showQH = key;
      this.selectedCell = cell;
      let currentQ;
      if (this.selectedCell && this.selectedCell.showQH) {
        currentQ = this.selectedCell.Hquestion
      }
      if (this.selectedCell && !this.selectedCell.showQH) {
        currentQ = this.selectedCell.Vquestion
      }
      if (this.previousQ != currentQ) {
        this.previousQ = this.selectedCell.showQH ? this.selectedCell.Hquestion : this.selectedCell.Vquestion;
        let answerlist = this.selectedCell.showQH ? this.selectedCell.HanswerArray : this.selectedCell.VanswerArray;

        this.getRandomValues(this.barakhadi, answerlist, 18)
      }
    }


  }

  getRandomValues(barakhadi: any, answerArray: any, totalCount: any) {


    let resultArray = [...answerArray]; // Include all values from answerArray

    // Randomly select values from barakhadi until resultArray length equals totalCount
    while (resultArray.length < totalCount) {
      const randomIndex = Math.floor(Math.random() * barakhadi.length);
      const selectedValue = barakhadi[randomIndex];

      // Ensure there are no duplicates from barakhadi in the resultArray
      if (!resultArray.includes(selectedValue)) {
        resultArray.push(selectedValue);
      }
    }

    // Shuffle the resultArray
    for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }
    console.log(resultArray)
    this.keyWord = resultArray;
  }

  onCLickvalue(value: any) {
    if (this.selectedCell.isBlanckdCell == true) {
      return;
    }
    if (this.selectedCell.isCompleteCell == false) {
      this.selectedCell['value'] = value;
      let index = this.clues['across'].findIndex((x: any) => x.clue == this.selectedCell.Hquestion);
      if (index != -1) {
        let completedfalg = true;
        this.clues['across'][index]['allCellList'].map((f: any, index2: any) => {
          let i = f.split(',')[0]
          let j = f.split(',')[1]
          if (this.grid[i][j]['answer'] != this.grid[i][j]['value']) {
            completedfalg = false;
          }
          if ((index2 + 1) == this.clues['across'][index]['allCellList'].length) {
            if (completedfalg == true) {
              this.checkIsCompleteCrossWord()
              this.clues['across'][index]['completed'] = true;
              this.saveAnswer(this.clues['across'][index]);
              this.clues['across'][index]['allCellList'].map((f: any, index2: any) => {
                let i = f.split(',')[0]
                let j = f.split(',')[1]
                this.grid[i][j]['isCompleteCell'] = true;

              })
            }
          }
        })
      }
      let Vindex = this.clues['down'].findIndex((x: any) => x.clue == this.selectedCell.Vquestion);
      if (Vindex != -1) {

        let completedfalg = true;
        this.clues['down'][Vindex]['allCellList'].map((f: any, index2: any) => {
          let i = f.split(',')[0]
          let j = f.split(',')[1]
          if (this.grid[i][j]['answer'] != this.grid[i][j]['value']) {
            completedfalg = false;
          }
          if ((index2 + 1) == this.clues['down'][Vindex]['allCellList'].length) {
            if (completedfalg == true) {
              this.saveAnswer(this.clues['down'][Vindex]);
              this.clues['down'][Vindex]['completed'] = true;
              this.checkIsCompleteCrossWord()
              this.clues['down'][Vindex]['allCellList'].map((f: any, index2: any) => {
                let i = f.split(',')[0]
                let j = f.split(',')[1]
                this.grid[i][j]['isCompleteCell'] = true;
              })
            }
          }
        });

      }

      if (this.selectedCell.showQH && index != -1) {
        this.checkNextCellHorizonatal(index, this.selectedCell.rowNumber, this.selectedCell.cellnumber)
      } else
        if (!this.selectedCell.showQH && Vindex != -1) {
          this.checkNextCellVertical(Vindex, this.selectedCell.rowNumber, this.selectedCell.cellnumber)
        }
    }


  }

  checkIsCompleteCrossWord() {
    setTimeout(() => {
      let index = this.clues['across'].findIndex((f: any) => f['completed'] == false);
      let index2 = this.clues['down'].findIndex((f: any) => f['completed'] == false);
      console.log(index, index2, this.clues['across'], this.clues['down'])
      // if (index == -1 && index2 == -1) {
      //   this.completed = true;
      //   this.finsh()
      // }

    }, 500)
  }

  checkNextCellHorizonatal(index: any, row: any, col: any) {
    let nextCellaPath = row + ',' + (col + 1)
    let nexCellIndex = this.clues['across'][index]['allCellList'].findIndex((f: any) => f == nextCellaPath);
    if (nexCellIndex != -1) {
      let cellItem = this.grid[row][col + 1];
      let cellItemold = this.grid[row][col];
      cellItem['showQH'] = cellItemold.showQH;

      if (cellItem.isCompleteCell) {
        this.checkNextCellHorizonatal(index, row, col + 1)
      } else {
        this.clickonCell(cellItem, cellItemold.showQH);
      }
    }
  }
  checkNextCellVertical(Vindex: any, row: any, col: any) {
    let nextCellaPath = (row + 1) + ',' + (col)
    let nexCellIndex = this.clues['down'][Vindex]['allCellList'].findIndex((f: any) => f == nextCellaPath);
    if (nexCellIndex != -1) {
      let cellItem = this.grid[row + 1][col]
      let cellItemOld = this.grid[row][col]
      cellItem['showQH'] = cellItemOld.showQH;
      if (cellItem.isCompleteCell) {
        this.checkNextCellVertical(Vindex, row + 1, col);
      } else {
        this.clickonCell(cellItem, cellItemOld.showQH);
      }
    }
  }


  saveAnswer(data: any) {
    let obj = {
      user_id: this.userId,
      game_master_id: data.game_master_id,
      question_id: data.id,
      answer: data.answer,
      ans: true

    }
    this.socket.saveCrossWordAns(obj);
  }


  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }


  destroyComponent(): void {
    this.vcr.clear(); // This will destroy the component by clearing the ViewContainerRef
  }
  finsh() {
    let obj = {
      user_id: this.userId,
      game_master_id: this.clues['across'][0]['game_master_id'],
      completed: true,
      time: this.remainingTime ? this.remainingTime : 0
    }
    this.socket.completeGame(obj)
    this.isCompletd.emit(true);
  }
}
