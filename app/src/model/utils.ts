export const EmptyField = null;
export type GameSymbol = 0 | 1 | null
export type Coordinate = { x: number, y: number }
export const PlayIcons = {
  0: 'radio_button_unchecked',
  1: 'close',
};

export const symbolToIcon = (symbol: GameSymbol) => {
  if (symbol === null) return '';
  return PlayIcons[symbol];
};
