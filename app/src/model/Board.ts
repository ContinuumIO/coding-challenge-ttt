import {Coordinate, EmptyField, GameStatus, GameSymbol} from './utils';
import flatten from 'lodash.flatten';
import {InvalidMove} from './Errors';

export class Board {
  private readonly _board: GameSymbol[][];
  status: GameStatus = GameStatus.initiated;
  winner?: GameSymbol;

  constructor() {
    this._board = [];
    this._board.push([EmptyField, EmptyField, EmptyField]);
    this._board.push([EmptyField, EmptyField, EmptyField]);
    this._board.push([EmptyField, EmptyField, EmptyField]);
  }

  get rows(): GameSymbol[][] {
    return this._board;
  }

  get tiles(): GameSymbol[] {
    return flatten(this._board);
  }

  get size(): number {
    return 3;
  }

  getField(coordinates: Coordinate): GameSymbol {
    return this._board[coordinates.x][coordinates.y];
  }

  setField(symbol: GameSymbol, coordinates: Coordinate): boolean {
    if (this.status !== GameStatus.initiated || this._board[coordinates.x][coordinates.y] !== EmptyField) {
      throw new InvalidMove();
    }

    this._board[coordinates.x][coordinates.y] = symbol;

    const hasEnded = this.checkGameOver();
    if (hasEnded) {
      this.status = GameStatus.ended;
      return false;
    }
    return true;
  }

  private checkGameOver() {
    return this.checkRow(0) || this.checkRow(1) || this.checkRow(2) ||
      this.checkColumn(0) || this.checkColumn(1) || this.checkColumn(2) ||
      this.checkDiagonals() || this.tiles.indexOf(EmptyField) === -1;
  }

  checkRow(index: number): boolean {
    const hasWinner = this._board[index][0] !== EmptyField &&
      this._board[index][0] === this._board[index][1] &&
      this._board[index][0] === this._board[index][2];
    if (hasWinner) {
      this.winner = this._board[index][0];
    }
    return hasWinner;
  }

  checkColumn(index: number): boolean {
    const hasWinner = this._board[0][index] !== EmptyField &&
      this._board[0][index] === this._board[1][index] &&
      this._board[0][index] === this._board[2][index];
    if (hasWinner) {
      this.winner = this._board[0][index];
    }
    return hasWinner;
  }

  checkDiagonals(): boolean {
    const hasWinner = this._board[1][1] !== EmptyField &&
      ((this._board[0][0] === this._board[1][1] && this._board[2][2] === this._board[1][1]) ||
        (this._board[0][2] === this._board[1][1] && this._board[2][0] === this._board[1][1]));
    if (hasWinner) {
      this.winner = this._board[1][1];
    }
    return hasWinner;
  }
}
