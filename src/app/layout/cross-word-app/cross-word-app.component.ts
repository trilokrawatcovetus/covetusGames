import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  clickonCell(cell: any) {

    if ((cell.isCompleteCell == false || cell.isBlanckdCell == false) || this.completed == false) {

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
      this.getRandomValues(this.barakhadi, [this.selectedCell.answer], 26)
    }
    // if (cell.showQH) {
    // } else {
    //   this.selectedQ = cell.VendCell;

    // }
    // console.log(this.selectedCell.answer)
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
    this.selectedCell['value'] = value;
    if ((this.selectedCell.isCompleteCell == false || this.selectedCell.isBlanckdCell == false) && this.completed == false) {

      if (this.selectedCell.showQH || this.selectedCell.Hquestion) {
        // VanswerArray
        // HanswerArray
        let index = this.clues['across'].findIndex((x: any) => x.clue == this.selectedCell.Hquestion);

        // let tempStr = [];
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
              this.clues['across'][index]['allCellList'].map((f: any, index2: any) => {
                let i = f.split(',')[0]
                let j = f.split(',')[1]
                this.grid[i][j]['isCompleteCell'] = true;
              })
            }
          }
        })

      }
      if (!this.selectedCell.showQH || this.selectedCell.Vquestion) {
        // VanswerArray
        // HanswerArray
        // console.log(this.clues['down']['clue'], this.selectedCell.Hquestion);
        let index = this.clues['down'].findIndex((x: any) => x.clue == this.selectedCell.Vquestion);


        // let tempStr = [];
        let completedfalg = true;
        this.clues['down'][index]['allCellList'].map((f: any, index2: any) => {
          let i = f.split(',')[0]
          let j = f.split(',')[1]
          if (this.grid[i][j]['answer'] != this.grid[i][j]['value']) {
            completedfalg = false;
          }
          if ((index2 + 1) == this.clues['down'][index]['allCellList'].length) {
            if (completedfalg == true) {
              this.clues['down'][index]['completed'] = true;
              this.checkIsCompleteCrossWord()
              this.clues['down'][index]['allCellList'].map((f: any, index2: any) => {
                let i = f.split(',')[0]
                let j = f.split(',')[1]
                this.grid[i][j]['isCompleteCell'] = true;
              })
            }
          }
        })
      }
    }


  }

  checkIsCompleteCrossWord() {
    setTimeout(() => {
      let index = this.clues['across'].findIndex((f: any) => f['completed'] == false);
      let index2 = this.clues['down'].findIndex((f: any) => f['completed'] == false);
      console.log(index, index2, this.clues['across'], this.clues['down'])
      if (index == -1 && index2 == -1) {
        this.completed = true;
      }

    }, 500)
  }
}
