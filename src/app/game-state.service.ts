import { Injectable } from '@angular/core';
import { GamesApiService } from './games-api.service';
import swal from 'sweetalert2'

@Injectable()
export class GameStateService {
    private player1 : any;
    private player2 : any;
    board : [any];
    currentPlayer : any;
    playersReady : boolean;
    turnCount : number;

  constructor(private gamesApi : GamesApiService) { }

  startNewGame(playerX, playerO) : void {
      // Initial setup for a new game, resetting players and turn count
      this.turnCount = 1;
      this.player1 = {name : playerX, mark : 1};
      this.player2 = {name : playerO, mark : 0};

      this.currentPlayer = this.player1;

      // local stuff for now
      this.resetBoard();
      this.playersReady = true;
  }

  resetPlayers() : void {
      this.player1 = null;
      this.player2 = null;
      this.playersReady = false;
  }

  resetBoard() : void {
      this.board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]]
  }

  placePlayerMarker(r, c) : void {

      // Blocks players from overwriting a previously chosen cell
      if(this.board[r][c] != null){
          return
      }

      this.board[r][c] = this.currentPlayer.mark;
      // check for a win
      if(this.isWin()){
          this.saveGame();
         // Sweet Alert to indicate a Win
          swal({
              type : 'success',
              title : 'WINNER WINNER',
              text : this.currentPlayer.name,
              confirmButtonText : 'Play Again!',
              showCancelButton : true,
              cancelButtonText : 'New Players!',
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger',
              buttonsStyling : false
          })
          .then(response => {
              // Confirmed play again
              if(response.value) {
                  this.startNewGame(this.player1.name, this.player2.name);
              } else {
                  this.turnCount = undefined;
                  this.resetPlayers();
              }
          });
    // If still no wins, and 9 moves have been made then it is a tie
      } else if(this.turnCount >= 9) {
          swal({
              type : 'warning',
              title : 'TIE GAME',
              confirmButtonText : 'Play Again!'
          })
          .then(response => {
              // Confirmed play again
              if(response.value) {
                  this.startNewGame(this.player1.name, this.player2.name);
              } else {
                  this.turnCount = undefined;
                  this.resetPlayers();
              }
          })
      }
      this.turnCount++;
      // Updating currentPlayer to the not-currentPlayer
      if(this.currentPlayer == this.player1) {
          this.currentPlayer = this.player2;
      } else {
          this.currentPlayer = this.player1;
      }
  }

  saveGame() : void {
      var flattenedBoard = [].concat.apply([], this.board);
      this.gamesApi.saveGame([this.player1.name, this.player2.name], flattenedBoard)
      .subscribe(response => {
          console.log(response);
      }, err => {
          console.log(err);
      });
  }

  // Kicker for win state checking
  // returns true if win
  isWin() : boolean {
     return this.checkRows() || this.checkCols() || this.checkDiagonals();
  }

  // Checks the board rows for a win state
  checkRows() : boolean {
      for(let row = 0;row < 3; row++) {
          let markCount = 0;
          for(let col = 0;col < 3; col++) {
              if(this.board[row][col] === this.currentPlayer.mark) {
                  markCount++;
                  if(markCount == 3) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

  // Checks the board cols for a win state
  checkCols() : boolean {
      for(let col = 0;col < 3; col++) {
          let markCount = 0;
          for(let row = 0;row < 3; row++) {
              if(this.board[row][col] === this.currentPlayer.mark) {
                  markCount++;
                  if(markCount == 3) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

  // Checks the board for diagonal win states
  checkDiagonals() : boolean {
    if(this.board[0][0] == this.currentPlayer.mark
        && this.board[1][1] == this.currentPlayer.mark
        && this.board[2][2] == this.currentPlayer.mark) {
        return true;
    }
    if(this.board[0][2] == this.currentPlayer.mark
        && this.board[1][1] == this.currentPlayer.mark
        && this.board[2][0] == this.currentPlayer.mark) {
        return true;
    }
      return false;
  }

}
