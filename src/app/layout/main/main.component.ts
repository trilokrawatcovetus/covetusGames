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
  grid: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],

  ];

  clues: any = {
    "across": [
      {
        "number": 1,
        "cell": "1,1",
        "clue": "Feline pet",
        "answer": "CATS",
        "length": 4,
        "endCell": "1,4",
        "orientation": "horizontal"
      },
      {
        "number": 3,
        "cell": "3,1",
        "clue": "Canine pet",
        "answer": "कुत्ता",
        "length": 4,
        "endCell": "3,4",
        "orientation": "horizontal"
      }
    ],
    "down": [
      {
        "number": 1,
        "cell": "1,1",
        "clue": "A type of fruit",
        "answer": "APPLE",
        "length": 5,
        "endCell": "5,1",
        "orientation": "vertical"
      },
      {
        "number": 2,
        "cell": "1,2",
        "clue": "Color of the sky",
        "answer": "BLUE",
        "length": 4,
        "endCell": "4,2",
        "orientation": "vertical"
      }
    ]
  }

  submitAnswer() {
    console.log('SDFS');
  }
}
