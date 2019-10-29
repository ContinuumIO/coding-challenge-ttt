import { TTTService } from './../ttt.service';
import { Component, OnInit } from '@angular/core';

import { GameData } from './../data-models/game.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ttt-game',
  templateUrl: './ttt-game.component.html',
  styleUrls: ['./ttt-game.component.css']
})
export class TttGameComponent implements OnInit {
  activeGame: GameData = new GameData();
  board = [];
  boardSymbols = []; // keeps track of the current symbol in UI
  numSelections: number; // used to keep track of how many selections have been made
  pOneName: string;
  pTwoName: string;
  activePlayerId: number;
  curSymbol: string; // either X or O depending on active player
  endGameMsg: string;
  gameActive: boolean; // true if game is still going on, false if game is complete
  WINNING_IDX = 99; // used to distinguish which tiles represent a winning

  constructor(private router: Router, private tttService: TTTService) {}

  ngOnInit() {
    this.activeGame = this.tttService.getActiveGame();
    this.pOneName = this.activeGame.attributes.players[0];
    this.pTwoName = this.activeGame.attributes.players[1];
    this.activePlayerId = 0; // represents player one
    this.curSymbol = 'X';
    this.board = this.activeGame.attributes.board;
    this.board.forEach((tile, idx) => {
      if (tile !== null) {
        this.boardSymbols[idx] = tile === this.activePlayerId ? 'X' : 'O';
      }
    });
    this.numSelections = 0;
    this.gameActive = true;
  }

  updateBoard(idx: number) {
    // update board
    this.board[idx] = this.activePlayerId;
    this.boardSymbols[idx] = this.curSymbol;
    const gameComplete = this.isGameComplete();
    if (gameComplete) {
      // display end screen
      this.gameActive = false;
      // set game message
      if (this.numSelections === 9) {
        // tied
        this.endGameMsg = 'Game has ended in a tie!';
      } else {
        // we have a winner
        this.endGameMsg =
          this.activeGame.attributes.players[this.activePlayerId] +
          ' has won the game!';
      }
    } else {
      this.switchPlayers();
    }
    // update active game board
    this.activeGame.attributes.board = this.board;
    console.log('active game board - ' + this.activeGame.attributes.board);
    // update database
    this.tttService.updateGame(this.activeGame).subscribe();
  }

  /**
   * Receives the index of the 3 tiles that represent a winning game
   * and sets it to the WINNING_IDX (99). This allows us to differentiate
   * in the HTML between a regular selected tile and a winning tile
   * and set the corresponding style
   */
  setWinningIdxToBoard(idx1: number, idx2: number, idx3: number) {
    this.board[idx1] = this.WINNING_IDX;
    this.board[idx2] = this.WINNING_IDX;
    this.board[idx3] = this.WINNING_IDX;
  }

  switchPlayers() {
    this.activePlayerId = this.activePlayerId === 0 ? 1 : 0;
    this.curSymbol = this.curSymbol === 'X' ? 'O' : 'X';
  }

  /**
   * checks to see if game is complete (player has won or draw)
   * [0, 1, 2,
   *  3, 4, 5,
   *  6, 7, 8]
   */
  isGameComplete() {
    this.numSelections++;
    // check for draw
    if (this.numSelections === 9) {
      return true;
    }
    // check if it's a complete row
    if (this.isEqual(0, 1) && this.isEqual(1, 2)) {
      this.setWinningIdxToBoard(0, 1, 2);
      return true;
    } else if (this.isEqual(3, 4) && this.isEqual(4, 5)) {
      this.setWinningIdxToBoard(3, 4, 5);
      return true;
    } else if (this.isEqual(6, 7) && this.isEqual(7, 8)) {
      this.setWinningIdxToBoard(6, 7, 8);
      return true;
    }
    // check if it's a complete column
    if (this.isEqual(0, 3) && this.isEqual(3, 6)) {
      this.setWinningIdxToBoard(0, 3, 6);
      return true;
    } else if (this.isEqual(1, 4) && this.isEqual(4, 7)) {
      this.setWinningIdxToBoard(1, 4, 7);
      return true;
    } else if (this.isEqual(2, 5) && this.isEqual(5, 8)) {
      this.setWinningIdxToBoard(2, 5, 8);
      return true;
    }
    // check if it's a complete diagonal
    if (this.isEqual(2, 4) && this.isEqual(4, 6)) {
      this.setWinningIdxToBoard(2, 4, 6);
      return true;
    } else if (this.isEqual(0, 4) && this.isEqual(4, 8)) {
      this.setWinningIdxToBoard(0, 4, 8);
      return true;
    }
    return false;
  }

  /**
   * checks two tiles to see if they are equal only if they contain a value
   * requires idx of the two tiles
   */
  isEqual(idx1: number, idx2: number) {
    // console.log('idx1 - ' + idx1 + '   idx2 - ' + idx2);
    if (this.board[idx1] !== null && this.board[idx2] !== null) {
      // console.log('both values are not null');
      if (this.board[idx1] === this.board[idx2]) {
        return true;
      }
    }
    return false;
  }

  routeToMenu() {
    this.router.navigate(['']);
  }
}
