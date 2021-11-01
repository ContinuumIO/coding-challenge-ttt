import {Coordinate, EmptyField, GameStatus, TileSymbol} from './utils';
import flatten from 'lodash.flatten';
import chunk from 'lodash.chunk';
import {InvalidMove} from './Errors';

export class Board {
  private readonly _board: TileSymbol[][];
  status: GameStatus = GameStatus.initiated;
  winner?: TileSymbol;

  constructor(symbols?: TileSymbol[]) {
    if (symbols) {
      this._board = chunk(symbols, 3);
      const hasEnded = this.checkGameOver();
      this.status = hasEnded ? GameStatus.ended : GameStatus.initiated;
    } else {
      this._board = [];
      this._board.push([EmptyField, EmptyField, EmptyField]);
      this._board.push([EmptyField, EmptyField, EmptyField]);
      this._board.push([EmptyField, EmptyField, EmptyField]);
    }
  }

  get rows(): TileSymbol[][] {
    return this._board;
  }

  get tiles(): TileSymbol[] {
    return flatten(this._board);
  }

  get size(): number {
    return 3;
  }

  getField(coordinates: Coordinate): TileSymbol {
    return this._board[coordinates.x][coordinates.y];
  }

  setField(symbol: TileSymbol, coordinates: Coordinate): boolean {
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
