import {Component, Input} from '@angular/core';
import {Board} from '../../model/Game';
import {GameSymbol, symbolToIcon} from '../../model/utils';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss'],
})
export class BoardComponent {
  @Input('startWithO') osTurn!: boolean;
  @Input() board!: Board;


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

    this.board.setField(this.osTurn ? 0 : 1, {x, y});
    this.osTurn = !this.osTurn;
  }

  getIcon(tile: GameSymbol) {
    return symbolToIcon(tile);
  }
}
