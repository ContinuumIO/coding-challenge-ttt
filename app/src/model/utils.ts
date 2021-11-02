export const EmptyField = null;
export type PlayerSymbol = 0 | 1;
export type TileSymbol = 0 | 1 | null;
export type Coordinate = { x: number, y: number }
export const PlayIcons = {
  0: 'radio_button_unchecked',
  1: 'close',
};

export const symbolToIcon = (symbol: TileSymbol) => {
  if (symbol === null) return '';
  return PlayIcons[symbol];
};

export enum GameStatus {
  invalid,
  initiated,
  ended
}
