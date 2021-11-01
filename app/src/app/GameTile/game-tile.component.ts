import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../model/Game';
import {GameStatus} from '../../model/utils';

@Component({
  selector: 'game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss'],
})
export class GameTileComponent implements OnInit {
  @Input() game!: Game;

  constructor() {
  }

  ngOnInit(): void {
  }

  get title(): string {
    switch (this.game.status) {
      case GameStatus.initiated:
        return 'Game incomplete!';
      case GameStatus.ended:
        return 'Game has finished';
      default:
        return 'Invalid game';
    }
  }

  get result(): string {
    if (this.game.status !== GameStatus.ended) return '';

    if (this.game.winner) {
      return `Result: ${this.game.winner.username} won!`;
    }
    return 'Result: Tied';
  }

  restoreGame() {

  }
}
