export class InvalidMove extends Error {
  constructor() {
    super('This is an invalid move. Either this field is already set or the game is over.');
  }
}

export class GameOver extends Error {
  constructor() {
    super('This game is over');
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
