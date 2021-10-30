import {Game} from './Game';
import {GameSymbol, symbolToIcon} from './utils';

export class Player {
  constructor(public symbol: GameSymbol, public username: string) {
  }

  get icon(): string {
    return symbolToIcon(this.symbol);
  }

  get games(): Game[] {
    return [];
  }
}
