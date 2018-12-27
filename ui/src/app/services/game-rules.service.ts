import { Injectable } from '@angular/core';
import { GameBoardService } from './game-board.service';

@Injectable({
  providedIn: 'root'
})
export class GameRulesService {

  constructor(private gameBoard: GameBoardService) {
  }

  evaluateWinner(player) {
    return (this.evaluateVertical(player) || this.evaluateHorizontal(player) || this.evaluateDiagonal(player));
  }

  evaluateDiagonal(player) {
    let validLine = true;
    let cursor;
    const end = this.gameBoard.gridSize - 1;
    for (let corner = 0; corner <= end; corner += end) {
      validLine = true;
      cursor = corner;
      while (validLine && (cursor < this.gameBoard.value.length)) {
        validLine = ((this.gameBoard.value[cursor] !== null) && (this.gameBoard.value[cursor] === player));
        cursor += ((!corner) ? ((this.gameBoard.gridSize - 1) * 2) : (cursor + end));
      }
      if (validLine) {
        break;
      }
    }
    return validLine;
  }

  evaluateVertical(player) {
    let validLine;
    let cursor;
    let end;
    for (let col = 0; col < this.gameBoard.gridSize; col++) {
      validLine = true;
      cursor = col;
      end = (col + ((this.gameBoard.gridSize - 1) * this.gameBoard.gridSize));
      while (validLine && (cursor <= end)) {
        validLine = ((this.gameBoard.value[cursor] !== null) && (this.gameBoard.value[cursor] === player));
        cursor += this.gameBoard.gridSize;
      }
      if (validLine) {
        break;
      }
    }
    return validLine;
  }

  evaluateHorizontal(player) {
    let validLine;
    let cursor;
    let end;
    const stop = this.gameBoard.gridSize * (this.gameBoard.gridSize - 1);
    for (let row = 0; row <= stop; row += this.gameBoard.gridSize) {
      validLine = true;
      cursor = row;
      end = (row + this.gameBoard.gridSize) - 1;
      while (validLine && (cursor <= end)) {
        validLine = ((this.gameBoard.value[cursor] !== null) && (this.gameBoard.value[cursor] === player));
        cursor++;
      }
      if (validLine) {
        break;
      }
    }
    return validLine;
  }

}
