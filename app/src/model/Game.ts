import {Player} from './Player';
import {InvalidPlayerNumber} from './Errors';
import {Board} from './Board';
import {GameStatus} from './utils';
import axios from 'axios';

export class Game {
  id?: string;
  type: string = 'Game';
  board?: Board;
  private _players: Player[] = [];


  async startGame(player1?: Player, player2?: Player): Promise<void> {
    if (!player1 || !player2) {
      throw new InvalidPlayerNumber();
    }
    this._players = [player1, player2];
    this.board = new Board();

    const {data: newGame} = await axios.post(`/games`, this.parse());

    this.id = newGame.id;
    this.type = newGame.type;
  }

  async restart() {
    await this.startGame(...this._players);
  }

  update(continuePlaying: boolean) {
    console.log(continuePlaying);
    console.log('Update!');
    this.updateRemote();
  }

  updateRemote() {
    axios.post(`/games/${this.id}`, this.parse()).then(response => {
      console.log('Saved Game', response);
    });
  }

  get status() {
    return this.board?.status || GameStatus.invalid;
  }

  get playerNames() {
    return this._players.map(p => p.username);
  }

  parse() {
    return {
      players: this.playerNames,
      board: this.board?.tiles || [],
    };
  }
}
