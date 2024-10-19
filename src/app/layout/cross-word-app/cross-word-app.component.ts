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
  @Input() clues!: any[];

  selectedQ: any;
  selectedCell: any;

  clickonCell(cell: any) {
    cell.showQH = !cell.showQH;
    this.selectedCell = cell;
    // if (cell.showQH) {
    // } else {
    //   this.selectedQ = cell.VendCell;

    // }
  }
}
