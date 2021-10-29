export const EmptyField = null;
export type GameSymbol = 0 | 1 | null
export type Coordinate = { x: number, y: number }

export class InvalidMove extends Error {
  constructor() {
    super('This field is already set');
  }
}

export class GameNotStarted extends Error {
  constructor() {
    super('Game has not been initiated');
  }
}

export class InvalidPlayerNumber extends Error {
  constructor() {
    super('You need two players to play');
  }
}
