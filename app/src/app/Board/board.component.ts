import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TileSymbol, symbolToIcon} from '../../model/utils';
import {Board} from '../../model/Board';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss'],
})
export class BoardComponent {
  @Input('startWithO') osTurn!: boolean;
  @Input() board!: Board;

  @Output() updated = new EventEmitter<boolean>();

  // Examples: 2 -> x = 0; y = 2
  // 3 -> x = 0; y = 0
  // 7 -> x = 2; y = 1
  // 8 -> x = 2; y = 2
  private static indexToCoordinates(index: number) {
    const x = Math.floor(index / 3);
    const y = index - (x * 3);
    return {x, y};
  }

  setTile(index: number) {
    const {x, y} = BoardComponent.indexToCoordinates(index);

    const continuePlaying = this.board.setField(this.osTurn ? 0 : 1, {x, y});

    this.updated.emit(continuePlaying);

    if (continuePlaying) {
      this.osTurn = !this.osTurn;
    }
  }

  getIcon(tile: TileSymbol) {
    return symbolToIcon(tile);
  }
}
