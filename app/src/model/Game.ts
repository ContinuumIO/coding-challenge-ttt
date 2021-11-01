import {Player} from './Player';
import {InvalidPlayerNumber} from './Errors';
import {Board} from './Board';
import {GameStatus, TileSymbol} from './utils';
import axios from 'axios';

export interface RemoteGame {
  id: string;
  type: string;
  attributes: {
    players: string[];
    board: TileSymbol[]
  };
}

export class Game {
  id?: string;
  type: string = 'Game';
  board?: Board;
  private _players: Player[] = [];

  constructor(id?: string, type: string = 'Game', players: Player[] = [], board?: Board) {
    this.id = id;
    this.type = type;
    this._players = players;
    this.board = board;
  }

  async startGame(player1?: Player, player2?: Player): Promise<void> {
    if (!player1 || !player2) {
      throw new InvalidPlayerNumber();
    }
    this._players = [player1, player2].sort((a, b) => a.symbol - b.symbol);
    this.board = new Board();

    const {data: newGame} = await axios.post(`/games`, this.parse());

    this.id = newGame.id;
    this.type = newGame.type;
  }

  async restart() {
    await this.startGame(...this._players);
  }

  updateRemote() {
    axios.post(`/games/${this.id}`, this.parse()).then(response => {
      console.log('Saved Game', response);
    });
  }

  getPlayer(index: number) {
    return this._players[index];
  }

  get status() {
    return this.board?.status || GameStatus.invalid;
  }

  get playerNames() {
    return this._players.map(p => p.username);
  }

  get winner() {
    console.log('Calculate winner', this.board?.winner);
    if (this.board && this.board.winner !== undefined) {
      const symbol = this.board.winner;
      return this._players.find((p) => p.symbol === symbol);
    }
    return undefined;
  }

  parse() {
    return {
      players: this.playerNames,
      board: this.board?.tiles || [],
    };
  }

  static fromJson(gameJson: RemoteGame) {
    const players = gameJson.attributes.players;
    const player1 = new Player(0, players[0]);
    const player2 = new Player(1, players[1]);
    const board = new Board(gameJson.attributes.board);
    return new Game(gameJson.id, gameJson.type, [player1, player2], board);
  }

}
