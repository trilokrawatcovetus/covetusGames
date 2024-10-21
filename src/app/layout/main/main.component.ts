import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrossWordAppComponent } from '../cross-word-app/cross-word-app.component';
import { AlphabetGameComponent } from '../alphabet-game/alphabet-game.component';
import { SocketService } from '../../services/socket.service'
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CrossWordAppComponent, AlphabetGameComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private sokect: SocketService) {

  }
  gridSize = 10; // 10x10 grid
  grid: any[][] = [];
  blankCells: any[] = [];
  clues: any = {
    "across": [
      {
        "number": 1,
        "cell": "0,2",
        "clue": "अधिकार, कब्जा, हक",
        "answer": "दावा",
        "answerArray": ["दा", "वा"],
        "endCell": "0,3",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 3,
        "cell": "0,6",
        "clue": "अगल-बगल, आजू-बाजू, इर्द-गिर्द",
        "answer": "आसपास",
        "answerArray": ["आ", "स", "पा", "स"],
        "endCell": "0,9",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 5,
        "cell": "1,0",
        "clue": "राष्ट्र, मुल्क, वतन",
        "answer": "देश",
        "answerArray": ["दे", "श"],
        "endCell": "1,1",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 7,
        "cell": "2,1",
        "clue": "चौका, पाकशाला, पाकागार",
        "answer": "रसोईघर",
        "answerArray": ["र", "सो", "ई", "घ", "र"],
        "endCell": "2,5",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 9,
        "cell": "2,7",
        "clue": "नोकदार, पैना",
        "answer": "नुकिला",
        "answerArray": ["नु", "कि", "ला"],
        "endCell": "2,9",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 10,
        "cell": "3,0",
        "clue": "युद्ध, लड़ाई, संग्राम",
        "answer": "रण",
        "answerArray": ["र", "ण"],
        "endCell": "3,1",
        "orientation ": "across"
      },
      {
        "number": 11,
        "cell": "4,3",
        "clue": "दूब, दूर्वा का एक अन्य नाम",
        "answer": "जया",
        "answerArray": ["ज", "या"],
        "endCell": "3,4",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 12,
        "cell": "4,6",
        "clue": "बहुत अधिक, बहुत ज्यादा, अतीव",
        "answer": "अतिशय",
        "answerArray": ["अ", "ति", "श", "य"],
        "endCell": "4,9",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 14,
        "cell": "5,0",
        "clue": "अद्भुत कार्य, करिश्मा, करतब",
        "answer": "कमाल",
        "answerArray": ["क", "मा", "ल"],
        "endCell": "5,2",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 17,
        "cell": "6,8",
        "clue": "ग़रीब, दरिद्र, कृपण",
        "answer": "रंक",
        "answerArray": ["रं", "क"],
        "endCell": "6,9",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 18,
        "cell": "7,0",
        "clue": "चन्द्रवार, सप्ताह का पहला वार",
        "answer": "सोमवार",
        "answerArray": ["सो", "म", "वा", "र"],
        "endCell": "7,3",
        "orientation": "across",
        "type": "across"
      },
      {
        "number": 19,
        "cell": "8,3",
        "clue": "श्रमिक, कार्मिक, कर्मी",
        "answer": "मजदूर",
        "answerArray": ["म", "ज", "दू", "र"],
        "endCell": "8,6",
        "orientation": "across",
        "type": "across"
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
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 4,
        "cell": "0,7",
        "clue": "हमदर्दी, संवेदना",
        "answer": "सहानुभूति",
        "answerArray": ["स", "हा", "नु", "भू", "ति"],
        "endCell": "4,7",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 6,
        "cell": "1,1",
        "clue": "आश्रय, आसरा, पनाह",
        "answer": "शरण",
        "answerArray": ["श", "र", "ण"],
        "endCell": "3,1",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 8,
        "cell": "2,4",
        "clue": "घास काटने वाला",
        "answer": "घसियार",
        "answerArray": ["घ", "सि", "या", "र"],
        "endCell": "5,4",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 10,
        "cell": "3,0",
        "clue": "रंगीला, रसिया, मनचला",
        "answer": "रसिक",
        "answerArray": ["र", "सि", "क"],
        "endCell": "5,0",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 12,
        "cell": "4,6",
        "clue": "अकसर, अधिकांशतः, बहुधा",
        "answer": "अधिकतर",
        "answerArray": ["अ", "धि", "क", "त", "र"],
        "endCell": "8,6",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 13,
        "cell": "4,8",
        "clue": "चौंसठ खान ों की बिसात पर खेला जाने वाला खेल",
        "answer": "शतरंज",
        "answerArray": ["श", "त", "रं", "ज"],
        "endCell": "8,8",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 15,
        "cell": "5,1",
        "clue": "विदित, अवगत, वाकिफ",
        "answer": "मालूम",
        "answerArray": ["मा", "लू", "म"],
        "endCell": "7,1",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 16,
        "cell": "6,3",
        "clue": "कार्य, कृत्य",
        "answer": "कर्म",
        "answerArray": ["क", "र", "म"],
        "endCell": "9,3",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 18,
        "cell": "7,0",
        "clue": "सुंदर, सलोना, प्रेमी, आशिक",
        "answer": "सोहन",
        "answerArray": ["सो", "ह", "न"],
        "endCell": "=9,0",
        "orientation": "down",
        "type": "down"
      },
      {
        "number": 20,
        "cell": "8,5",
        "clue": "फ़ासला, अंतर, फ़र्क़",
        "answer": "दूरी",
        "answerArray": ["दू", "री"],
        "endCell": "9,5",
        "orientation": "down",
        "type": "down"
      }
    ]
  }
  alphabetQuestion: any = [
    {
      lable: 'A',
      image: 'assets/images/apple.png',
      clue: 'Which of these fruits is red and starts with A?',
      answers: ['Apple', 'Avocado', 'Apricot', 'Almond', 'Acai'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'B',
      image: 'assets/images/ball.png',
      clue: 'Which of these is round and starts with B?',
      answers: ['Ball', 'Banana', 'Bat', 'Bottle', 'Bag'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'C',
      image: 'assets/images/cat.png',
      clue: 'Which of these is a domestic animal and starts with C?',
      answers: ['Cat', 'Cow', 'Camel', 'Cheetah', 'Crane'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'D',
      image: 'assets/images/dog.png',
      clue: 'Which of these is man’s best friend and starts with D?',
      answers: ['Dog', 'Duck', 'Deer', 'Dolphin', 'Dragonfly'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'E',
      image: 'assets/images/elephant.png',
      clue: 'Which of these is the largest land animal and starts with E?',
      answers: ['Elephant', 'Eagle', 'Emu', 'Eel', 'Elk'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'F',
      image: 'assets/images/fish.png',
      clue: 'Which of these animals lives in water and starts with F?',
      answers: ['Fish', 'Falcon', 'Frog', 'Fox', 'Ferret'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'G',
      image: 'assets/images/grapes.png',
      clue: 'Which of these is a fruit and starts with G?',
      answers: ['Grapes', 'Goose', 'Garlic', 'Ginger', 'Giraffe'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'H',
      image: 'assets/images/horse.png',
      clue: 'Which of these animals is known for racing and starts with H?',
      answers: ['Horse', 'Hawk', 'Hamster', 'Hedgehog', 'Heron'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'I',
      image: 'assets/images/icecream.png',
      clue: 'Which of these is a frozen dessert and starts with I?',
      answers: ['Ice cream', 'Igloo', 'Insect', 'Ink', 'Iron'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'J',
      image: 'assets/images/jellyfish.png',
      clue: 'Which of these is a sea creature and starts with J?',
      answers: ['Jellyfish', 'Jaguar', 'Jacket', 'Jungle', 'Jeep'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'K',
      image: 'assets/images/kangaroo.png',
      clue: 'Which of these is a jumping marsupial and starts with K?',
      answers: ['Kangaroo', 'Koala', 'Kite', 'Kiwi', 'Knife'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'L',
      image: 'assets/images/lion.png',
      clue: 'Which of these is the king of the jungle and starts with L?',
      answers: ['Lion', 'Leopard', 'Lobster', 'Lizard', 'Lynx'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'M',
      image: 'assets/images/monkey.png',
      clue: 'Which of these animals loves to swing on trees and starts with M?',
      answers: ['Monkey', 'Moose', 'Mule', 'Mouse', 'Mantis'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'N',
      image: 'assets/images/nest.png',
      clue: 'Which of these is a home for birds and starts with N?',
      answers: ['Nest', 'Net', 'Noodles', 'Notebook', 'Necklace'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'O',
      image: 'assets/images/octopus.png',
      clue: 'Which of these sea creatures has eight arms and starts with O?',
      answers: ['Octopus', 'Owl', 'Ostrich', 'Otter', 'Orca'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'P',
      image: 'assets/images/penguin.png',
      clue: 'Which of these is a bird that cannot fly and starts with P?',
      answers: ['Penguin', 'Parrot', 'Peacock', 'Pigeon', 'Puma'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'Q',
      image: 'assets/images/queen.png',
      clue: 'Which of these is a royal female leader and starts with Q?',
      answers: ['Queen', 'Quail', 'Question', 'Quilt', 'Quarter'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'R',
      image: 'assets/images/rabbit.png',
      clue: 'Which of these is a small, fluffy animal that hops and starts with R?',
      answers: ['Rabbit', 'Raccoon', 'Rat', 'Raven', 'Reindeer'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'S',
      image: 'assets/images/sun.png',
      clue: 'Which of these is a star at the center of our solar system and starts with S?',
      answers: ['Sun', 'Snake', 'Star', 'Swan', 'Spider'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'T',
      image: 'assets/images/tiger.png',
      clue: 'Which of these is a large wild cat with stripes and starts with T?',
      answers: ['Tiger', 'Turtle', 'Tuna', 'Toucan', 'Termite'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'U',
      image: 'assets/images/unicorn.png',
      clue: 'Which of these is a mythical horse with a horn and starts with U?',
      answers: ['Unicorn', 'Urchin', 'Umbrella', 'UFO', 'Unicycle'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'V',
      image: 'assets/images/violin.png',
      clue: 'Which of these is a string instrument and starts with V?',
      answers: ['Violin', 'Vase', 'Van', 'Vulture', 'Viper'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'W',
      image: 'assets/images/whale.png',
      clue: 'Which of these is a large marine mammal and starts with W?',
      answers: ['Whale', 'Wolf', 'Worm', 'Walrus', 'Woodpecker'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'X',
      image: 'assets/images/xylophone.png',
      clue: 'Which of these is a musical instrument that starts with X?',
      answers: ['Xylophone', 'Xerox', 'X-ray', 'Xylograph', 'Xenon'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'Y',
      image: 'assets/images/yak.png',
      clue: 'Which of these is an animal with long hair and starts with Y?',
      answers: ['Yak', 'Yacht', 'Yam', 'Yo-yo', 'Yellowtail'],
      value: '', // Correct answer is now empty
    },
    {
      lable: 'Z',
      image: 'assets/images/zebra.png',
      clue: 'Which of these is an animal with black-and-white stripes and starts with Z?',
      answers: ['Zebra', 'Zucchini', 'Zero', 'Zodiac', 'Zone'],
      value: '', // Correct answer is now empty
    },
  ];


  ngOnInit(): void {
    this.initializeGrid();
    // this.populateGrid();
    // this.findBlankCells();
    this.clues.across.map((f: any) => {
      f['completed'] = false;
      let length = f['answerArray'].length;
      f['allCellList'] = [];
      let k = parseInt(f.cell.split(',')[1])
      let i = parseInt(f.cell.split(',')[0])
      console.log(k, 1)
      for (let x = 0; x <= length - 1; x++) {

        let str = i + ',' + (k + x);
        f['allCellList'].push(str)

      }
    })
    this.clues.down.map((f: any) => {
      f['completed'] = false;
      let length = f['answerArray'].length;
      f['allCellList'] = [];
      let k = parseInt(f.cell.split(',')[1])
      let i = parseInt(f.cell.split(',')[0])
      for (let x = 0; x <= length - 1; x++) {

        let str = (i + x) + ',' + k
        f['allCellList'].push(str)

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
}
