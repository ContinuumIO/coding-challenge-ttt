import {Player} from './Player';
import {Coordinate, EmptyField, GameNotStarted, GameSymbol, InvalidMove, InvalidPlayerNumber} from './types';
import {v4 as uuidV4} from 'uuid';
import flatten from 'lodash.flatten';

export enum GameStatus {
  invalid,
  initiated,
  ended
}

export class Board {
  private readonly _board: GameSymbol[][];

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

  setField(symbol: GameSymbol, coordinates: Coordinate): void {
    if (this._board[coordinates.x][coordinates.y] !== EmptyField) {
      throw new InvalidMove();
    }
    this._board[coordinates.x][coordinates.y] = symbol;
  }
}

export class Game {
  id: string;
  type: string = 'Game';
  board?: Board;
  status: GameStatus;
  private _players: Player[] = [];

  constructor() {
    this.id = uuidV4();
    this.status = GameStatus.invalid;
    this.board = new Board();
  }

  startGame(player1?: Player, player2?: Player): void {
    if (!player1 || !player2) {
      throw new InvalidPlayerNumber();
    }
    this._players = [player1, player2];
    this.status = GameStatus.initiated;
    this.board = new Board();
  }

  playerMove(player: Player, coordinates: Coordinate): void {
    if (this.status !== GameStatus.initiated || !this.board) {
      throw new GameNotStarted();
    }
    this.board.setField(player.symbol, coordinates);
  }
}
