export class AttributesData {
  players: string[];
  board: number[];

  constructor() {}

  initialize(pOneName: string, pTwoName: string) {
    // console.log('one - ' + pOneName);
    // console.log('two - ' + pTwoName);
    this.players = [];
    this.players.push(pOneName);
    this.players.push(pTwoName);
    // initialize board to null
    this.board = Array(9).fill(null);
  }
}
