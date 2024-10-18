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
  @Input() grid!: string[][];
  @Input() clues!: string[];
}
