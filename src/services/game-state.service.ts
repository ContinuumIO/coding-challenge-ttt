import { Injectable } from '@angular/core';
import { GamesApiService } from './games-api.service';
import swal from 'sweetalert2'

@Injectable()
export class GameStateService {
    private player1 : any;
    private player2 : any;
    board : [any];
    gameId : string;
    currentPlayer : any;
    playersReady : boolean;
    turnCount : number;

  constructor(private gamesApi : GamesApiService) { }

  startNewGame(playerX, playerO) : void {
      // Initial setup for a new game, resetting players and turn count
      this.turnCount = 1;
      this.setPlayers(playerX, playerO);
      this.currentPlayer = this.player1;
      this.resetBoard();
  }

  resetPlayers() : void {
      this.player1 = null;
      this.player2 = null;
      this.playersReady = false;
      this.turnCount = undefined;
  }

  resetBoard() : void {
      this.board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
      this.gameId = null;
  }

  resumeGame(gameId) : void {
      this.gamesApi.findGame(gameId)
      .subscribe(response => {
          this.resetBoard();
          // After getting the data, let's set everything up
          let game = response.data;
          this.gameId = game.id;
          this.setPlayers(game.attributes.players[0], game.attributes.players[1]);

          // Counts to keep track of next players turn after loda
          let xCount = 0;
          let oCount = 0;
          let boardMarkCount = 0;
          // now set the board
          for(let r=0;r < 3;r++){
              for(let c=0;c< 3;c++) {
                  this.board[r][c]=game.attributes.board[boardMarkCount];
                  boardMarkCount++;
                  if(this.board[r][c]==1){
                      xCount++;
                  } else if(this.board[r][c]==0){
                      oCount++;
                  }
              }
          }
         // Determing which players turn it is after resume
         if(xCount <= oCount){
             this.currentPlayer = this.player1;
         } else{
             this.currentPlayer = this.player2;
         }
         this.turnCount = xCount+oCount;
     }, error => {
         swal({
             type : 'error',
             title : 'Failed loading game!'
         })
         .then(() => {
             this.resetPlayers();
         })
     });
  }


  placePlayerMarker(r, c) : void {
      // Blocks players from overwriting a previously chosen cell
      if(this.board[r][c] != null){
          return
      }

      this.board[r][c] = this.currentPlayer.mark;
      // check for a win
      if(this.isWin()){

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
                   // reset board and return to player select
                   this.resetPlayers();
               }
           });

    // If still no wins, and 9 moves have been made then it is a tie
      } else if(this.turnCount >= 9) {
          swal({
              type : 'warning',
              title : 'TIE GAME',
              confirmButtonText : 'Play Again!',
              showCancelButton : true,
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger',
              cancelButtonText : 'New Players!',
              buttonsStyling : false
          })
          .then(response => {
              // Confirmed play again
              if(response.value) {
                  this.startNewGame(this.player1.name, this.player2.name);
              } else {
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

  saveGameProgress() : any {
      this.saveGame(this.gameId)
      .subscribe(response => {
          this.gameId = response.id;
          swal({
              type : 'success',
              title : 'Progress Saved!'
          });
      }, error => {
          swal({
              type : 'error',
              title : 'Failed Saving progress!'
          })
      })
  }

  saveGame(gameId) : any {
      var flattenedBoard = [].concat.apply([], this.board);
      if(gameId) {
          return this.gamesApi.updateGame(gameId,[this.player1.name, this.player2.name], flattenedBoard);
      } else {
          return this.gamesApi.saveGame([this.player1.name, this.player2.name], flattenedBoard);
      }
  }

  // Kicker for win state checking
  // returns true if win
  isWin() : boolean {
     return this.checkRows() || this.checkCols() || this.checkDiagonals();
  }

  private setPlayers(player1, player2) {
      this.player1 = {name : player1, mark : 1};
      this.player2 = {name : player2, mark : 0};
      this.playersReady = true;
  }

  // Checks the board rows for a win state
  private checkRows() : boolean {
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
  private checkCols() : boolean {
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
  private checkDiagonals() : boolean {
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
