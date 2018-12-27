import { Injectable } from '@angular/core';
import { GameBoardService } from './game-board.service';
import { GameRulesService } from './game-rules.service';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class GameMasterService {

  public players: Array<string> = ['Player 1', 'Player 2'];
  public currentPlayer = 0;
  public gameInProgress = false;
  public winningPlayer;
  public gameOver = false;

  constructor(private api: RestApiService,
              private rules: GameRulesService,
              private board: GameBoardService
  ) {
    board.form.valueChanges.subscribe(() => {

      const isOver = this.players.map((player, idx) => this.rules.evaluateWinner(idx)).reduce((over, playerWin, playerIdx) => {
        return (playerWin) ? this.players[playerIdx] : over;
      }, false);

      if (isOver) {
        this.winningPlayer = isOver;
        this.endGame();
      }

    });
  }

  newGame() {
    this.board.resetGameBoard();
    this.currentPlayer = 0;
    this.gameOver = false;
    this.gameInProgress = true;
  }

  endGame() {
    this.gameOver = true;
    this.gameInProgress = false;
  }

  updatePlayers(players: Array<any>) {
    this.players = players;
  }

  turnEnd() {


    this.currentPlayer = (this.currentPlayer === 0) ? 1 : 0;
  }

  saveGame() {
  }


}
