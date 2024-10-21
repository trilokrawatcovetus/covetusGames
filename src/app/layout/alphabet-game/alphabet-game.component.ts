import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  constructor() {

  }
  ngOnInit() {
    // this.keys = Object.keys(this.alphabetQuestion);
    this.currentIndex = 0;
    this.selecteQuestion = this.alphabetQuestion[0]
  }
  // @Input() clues!: any;
  onCLickvalue(key: any, i: any) {
    if (key && key.isComplete == true) {
      return false;
    }
    console.log(this.selecteQuestion && this.selecteQuestion.isComplete)
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
      this.selecteQuestion.value = this.selecteQuestion.value + value
    }
  }
}
