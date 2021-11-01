import {Game} from './Game';
import {PlayerSymbol, symbolToIcon} from './utils';

export class Player {
  constructor(public symbol: PlayerSymbol, public username: string) {
  }

  get icon(): string {
    return symbolToIcon(this.symbol);
  }

  get games(): Game[] {
    return [];
  }
}
