import {Player} from './Player';
import {v4 as uuidV4} from 'uuid';
import {InvalidPlayerNumber} from './Errors';
import {Board} from './Board';
import {GameStatus} from './utils';

export class Game {
  id: string;
  type: string = 'Game';
  board?: Board;
  private _players: Player[] = [];

  constructor() {
    this.id = uuidV4();
  }

  startGame(player1?: Player, player2?: Player): void {
    if (!player1 || !player2) {
      throw new InvalidPlayerNumber();
    }
    this._players = [player1, player2];
    this.board = new Board();
  }

  restart() {
    this.board = new Board();
  }

  get status() {
    return this.board?.status || GameStatus.invalid;
  }

  sendToServer() {
    const parsedGame = {
      type: this.type,
      id: this.id,
      attributes: {
        players: this._players.map(p => p.username),
        board: this.board?.tiles,
      },
    };
    console.log(parsedGame);
  }
}
