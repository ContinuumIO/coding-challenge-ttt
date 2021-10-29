import {Game} from './Game';
import {GameSymbol} from './types';

export class Player {
  constructor(public symbol: GameSymbol, public username: string) {
  }

  get icon(): string {
    return this.symbol === 0 ? 'circle' : 'close';
  }

  get games(): Game[] {
    return [];
  }
}
