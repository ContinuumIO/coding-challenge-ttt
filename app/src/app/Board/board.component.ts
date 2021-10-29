import {Component, Input} from '@angular/core';
import {Board} from '../../model/Game';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss'],
})
export class BoardComponent {
  @Input() circleFirst!: boolean;
  @Input() board!: Board;

  playCircle: boolean = this.circleFirst;

  // Example: 2 -> x = 0; y = 2
  // 3 -> x = 0; y = 0
  // 7 -> x = 2; y = 1
  // 8 -> x = 2; y = 2
  setTile(index: number) {
    const x = Math.floor(index / 3);
    const y = index - (x * 3);


    this.board.setField(this.playCircle ? 0 : 1, {x, y});
    this.playCircle = !this.playCircle;
  }
}
