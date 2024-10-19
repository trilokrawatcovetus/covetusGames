import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossWordAppComponent } from '../cross-word-app/cross-word-app.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CrossWordAppComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  gridSize = 10; // 10x10 grid
  grid: any[][] = [];
  blankCells: any[] = [];
  ngOnInit(): void {
    this.initializeGrid();
    // this.populateGrid();
    // this.findBlankCells();
  }

  clues: any = {
    "across": [
      {
        "number": 1,
        "cell": "0,2",
        "clue": "अधिकार, कब्जा, हक",
        "answer": "दावा",
        "answerArray": ["दा", "वा"],
        "endCell": "0,3",
        "orientation": "horizontal"
      },
      {
        "number": 3,
        "cell": "0,6",
        "clue": "अगल-बगल, आजू-बाजू, इर्द-गिर्द",
        "answer": "आसपास",
        "answerArray": ["आ", "स", "पा", "स"],
        "endCell": "0,9",
        "orientation": "horizontal"
      },
      {
        "number": 5,
        "cell": "1,0",
        "clue": "राष्ट्र, मुल्क, वतन",
        "answer": "देश",
        "answerArray": ["दे", "श"],
        "endCell": "1,1",
        "orientation": "horizontal"
      },
      {
        "number": 7,
        "cell": "2,1",
        "clue": "चौका, पाकशाला, पाकागार",
        "answer": "रसोईघर",
        "answerArray": ["र", "सो", "ई", "घ", "र"],
        "endCell": "2,5",
        "orientation": "horizontal"
      },
      {
        "number": 9,
        "cell": "2,7",
        "clue": "नोकदार, पैना",
        "answer": "नुकिला",
        "answerArray": ["नु", "कि", "ला"],
        "endCell": "2,9",
        "orientation": "horizontal"
      },
      {
        "number": 10,
        "cell": "3,0",
        "clue": "युद्ध, लड़ाई, संग्राम",
        "answer": "रण",
        "answerArray": ["र", "ण"],
        "endCell": "3,1",
        "orientation ": "horizontal"
      },
      {
        "number": 11,
        "cell": "4,3",
        "clue": "दूब, दूर्वा का एक अन्य नाम",
        "answer": "जया",
        "answerArray": ["ज", "या"],
        "endCell": "3,4",
        "orientation": "horizontal"
      },
      {
        "number": 12,
        "cell": "4,6",
        "clue": "बहुत अधिक, बहुत ज्यादा, अतीव",
        "answer": "अतिशय",
        "answerArray": ["अ", "ति", "श", "य"],
        "endCell": "4,9",
        "orientation": "horizontal"
      },
      {
        "number": 14,
        "cell": "5,0",
        "clue": "अद्भुत कार्य, करिश्मा, करतब",
        "answer": "कमाल",
        "answerArray": ["क", "मा", "ल"],
        "endCell": "5,2",
        "orientation": "horizontal"
      },
      {
        "number": 17,
        "cell": "6,8",
        "clue": "ग़रीब, दरिद्र, कृपण",
        "answer": "रंक",
        "answerArray": ["रं", "क"],
        "endCell": "6,9",
        "orientation": "horizontal"
      },
      {
        "number": 18,
        "cell": "7,0",
        "clue": "चन्द्रवार, सप्ताह का पहला वार",
        "answer": "सोमवार",
        "answerArray": ["सो", "म", "वा", "र"],
        "endCell": "7,3",
        "orientation": "horizontal"
      },
      {
        "number": 19,
        "cell": "8,3",
        "clue": "श्रमिक, कार्मिक, कर्मी",
        "answer": "मजदूर",
        "answerArray": ["म", "ज", "दू", "र"],
        "endCell": "8,6",
        "orientation": "horizontal"
      }
    ],
    "down": [
      {
        "number": 2,
        "cell": "0,3",
        "clue": "सचमुच, वास्तव में, दरअसल",
        "answer": "वाकई",
        "answerArray": ["वा", "क", "ई"],
        "endCell": "2,3",
        "orientation": "vertical"
      },
      {
        "number": 4,
        "cell": "0,7",
        "clue": "हमदर्दी, संवेदना",
        "answer": "सहानुभूति",
        "answerArray": ["स", "हा", "नु", "भू", "ति"],
        "endCell": "4,7",
        "orientation": "vertical"
      },
      {
        "number": 6,
        "cell": "1,1",
        "clue": "आश्रय, आसरा, पनाह",
        "answer": "शरण",
        "answerArray": ["श", "र", "ण"],
        "endCell": "3,1",
        "orientation": "vertical"
      },
      {
        "number": 8,
        "cell": "2,4",
        "clue": "घास काटने वाला",
        "answer": "घसियार",
        "answerArray": ["घ", "सि", "या", "र"],
        "endCell": "5,4",
        "orientation": "vertical"
      },
      {
        "number": 10,
        "cell": "3,0",
        "clue": "रंगीला, रसिया, मनचला",
        "answer": "रसिक",
        "answerArray": ["र", "सि", "क"],
        "endCell": "5,0",
        "orientation": "vertical"
      },
      {
        "number": 12,
        "cell": "4,6",
        "clue": "अकसर, अधिकांशतः, बहुधा",
        "answer": "अधिकतर",
        "answerArray": ["अ", "धि", "क", "त", "र"],
        "endCell": "8,6",
        "orientation": "vertical"
      },
      {
        "number": 13,
        "cell": "4,8",
        "clue": "चौंसठ खान ों की बिसात पर खेला जाने वाला खेल",
        "answer": "शतरंज",
        "answerArray": ["श", "त", "रं", "ज"],
        "endCell": "8,8",
        "orientation": "vertical"
      },
      {
        "number": 15,
        "cell": "4,8",
        "clue": "विदित, अवगत, वाकिफ",
        "answer": "करम",
        "answerArray": ["क", "र", "म"],
        "endCell": "7,8",
        "orientation": "vertical"
      },
      {
        "number": 16,
        "cell": "6,3",
        "clue": "कार्य, कृत्य",
        "answer": "कर्म",
        "answerArray": ["क", "र", "म"],
        "endCell": "9,3",
        "orientation": "vertical"
      },
      {
        "number": 18,
        "cell": "7,0",
        "clue": "सुंदर, सलोना, प्रेमी, आशिक",
        "answer": "सोहन",
        "answerArray": ["सो", "ह", "न"],
        "endCell": "=9,0",
        "orientation": "vertical"
      },
      {
        "number": 20,
        "cell": "8,5",
        "clue": "फ़ासला, अंतर, फ़र्क़",
        "answer": "दूरी",
        "answerArray": ["दू", "री"],
        "endCell": "9,5",
        "orientation": "vertical"
      }
    ]
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
          showQH: false
        });
        if ((i + 1) == 10 && (j + 1) == 10) {
          this.checkAnswer()
        }
      }

      // }
    }

  }

  // populateGrid(): void {
  //   this.clues.across.forEach((answer: any) => {
  //     const [row, col] = answer.cell.split(',').map(Number);
  //     const answerChars = answer.answer.split('');
  //     for (let j = 0; j < answer.length; j++) {
  //       this.grid[row - 1][col - 1 + j] = {}; // Adjusting for 0-index
  //     }
  //   });

  //   this.clues.down.forEach((answer: any) => {
  //     const [row, col] = answer.cell.split(',').map(Number);
  //     const answerChars = answer.answer.split('');
  //     for (let j = 0; j < answer.length; j++) {
  //       this.grid[row - 1 + j][col - 1] = {} // Adjusting for 0-index
  //     }
  //   });
  // }

  // findBlankCells(): void {
  //   this.blankCells = [];
  //   this.grid.forEach((row, i) => {
  //     row.forEach((cell, j) => {
  //       if (cell === null) {
  //         this.blankCells.push(`${i + 1},${j + 1}`); // Adjusting for 1-index
  //       }
  //     });
  //   });
  //   console.log(this.blankCells);
  //   console.log(this.grid);
  // }

  checkAnswer() {
    this.grid.map((f: any, i: number) => {
      f.map((j: any, k: number) => {
        let str = i + ',' + k;
        let index = this.clues.across.findIndex((ele: any) => ele.cell == str);
        if (index != -1) {
          // console.log(this.clues.across[index]['answer'])
          let length = this.clues.across[index]['answerArray'].length;
          for (let x = 0; x <= length - 1; x++) {

            this.grid[i][k + x]['answer'] = this.clues.across[index]['answerArray'][x]
            this.grid[i][k + x]['isBlanckdCell'] = false;
            // this.grid[i][k + x]['Vquestion'] = false;
            this.grid[i][k + x]['Hquestion'] = this.clues.across[index]['clue'];
            j['qnumber'] = this.clues.across[index]['number']
          }

        }
        let index2 = this.clues.down.findIndex((ele: any) => ele.cell == str);
        if (index2 != -1) {
          // console.log(this.clues.down[index2]['answer'])
          let length = this.clues.down[index2]['answerArray'].length;
          for (let x = 0; x <= length - 1; x++) {
            this.grid[i + x][k]['answer'] = this.clues.down[index2]['answerArray'][x]
            this.grid[i + x][k]['isBlanckdCell'] = false;
            this.grid[i + x][k]['Vquestion'] = this.clues.down[index2]['clue'];
            j['qnumber'] = this.clues.down[index2]['number'];
          }

        }
      })
    })
  }
}
