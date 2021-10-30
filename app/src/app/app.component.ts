import {Component} from '@angular/core';
import {Player} from '../model/Player';
import {Game} from '../model/Game';
import shuffle from 'lodash.shuffle';
import {GameStatus, GameSymbol} from '../model/utils';
import {MatDialog} from '@angular/material/dialog';
import {FormDialog} from './Setup/form.dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  GameStatus = GameStatus;
  title = 'Tic Tac Toe';

  player1?: Player;
  player2?: Player;

  game: Game = new Game();

  symbolArray: GameSymbol[] = shuffle([0, 1]);

  constructor(public dialog: MatDialog) {
    // TODO: Remove this, only for testing!
    this.setPlayer1('a');
    this.setPlayer2('b');
    this.startGame();
  }

  setPlayer1(username: string) {
    this.player1 = new Player(this.symbolArray[0], username);
  }

  setPlayer2(username: string) {
    this.player2 = new Player(this.symbolArray[1], username);
  }

  startGame() {
    this.game.startGame(this.player1, this.player2);
  }

  openSetupDialog() {
    const dialogRef = this.dialog.open(FormDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.setPlayer1(result.player1);
      this.setPlayer2(result.player2);
      this.startGame();
    });
  }
}
