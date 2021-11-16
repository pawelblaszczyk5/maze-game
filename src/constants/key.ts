import { ArrowKey } from '@/model/enums/arrowKey';
import { MazeCell } from '@/model/maze';
import { RelativeDirection } from '@/model/enums/relativeDirection';

export const KEY_TO_WALL: Record<ArrowKey, keyof MazeCell['walls']> = {
  [ArrowKey.DOWN]: 'bottom',
  [ArrowKey.UP]: 'top',
  [ArrowKey.LEFT]: 'left',
  [ArrowKey.RIGHT]: 'right',
};

export const KEY_TO_DIRECTION: Record<ArrowKey, RelativeDirection> = {
  [ArrowKey.DOWN]: RelativeDirection.DOWN,
  [ArrowKey.UP]: RelativeDirection.UP,
  [ArrowKey.LEFT]: RelativeDirection.LEFT,
  [ArrowKey.RIGHT]: RelativeDirection.RIGHT,
};

export const KEY_TO_SYMBOL: Record<ArrowKey, string> = {
  [ArrowKey.DOWN]: '↓',
  [ArrowKey.UP]: '↑',
  [ArrowKey.LEFT]: '←',
  [ArrowKey.RIGHT]: '→',
};
