import {Component} from '@angular/core';
import {Player} from '../model/Player';
import {Game} from '../model/Game';
import shuffle from 'lodash.shuffle';
import {GameStatus, PlayerSymbol} from '../model/utils';
import {MatDialog} from '@angular/material/dialog';
import {FormDialog} from './Setup/form.dialog';
import axios from 'axios';
import {WinnerDialog} from './Winner/winner.dialog';

axios.defaults.baseURL = 'http://localhost:8080/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  GameStatus = GameStatus;
  symbolArray: PlayerSymbol[] = shuffle([0, 1]);

  showHistory = false;

  game: Game = new Game();

  error?: string;
  history: Game[] = [];

  constructor(public dialog: MatDialog) {
  }

  get player1() {
    return this.game.getPlayer(0);
  }

  get player2() {
    return this.game.getPlayer(1);
  }

  startGame(player1: Player, player2: Player) {
    this.showHistory = false;
    this.game.startGame(player1, player2).then(console.log);
  }

  openSetupDialog() {
    const dialogRef = this.dialog.open(FormDialog);

    dialogRef.afterClosed().subscribe(({player1, player2}) => {
      const p1 = new Player(this.symbolArray[0], player1);
      const p2 = new Player(this.symbolArray[1], player2);
      this.startGame(p1, p2);
    });
  }

  update(continuePlaying: boolean) {
    this.game.updateRemote();
    if (!continuePlaying) {
      this.dialog.open(WinnerDialog, {
        data: {
          winner: this.game.winner,
        },
      });
    }
  }

  async toggleHistory() {
    this.showHistory = !this.showHistory;
    if (this.showHistory) {
      const {data: response} = await axios.get('/games');
      this.history = response.data.map(Game.fromJson);
    }
  }

  restoreGame(gameToRestore: Game) {
    this.game = gameToRestore;
  }

  exitGame() {
    this.game = new Game();
  }
}
