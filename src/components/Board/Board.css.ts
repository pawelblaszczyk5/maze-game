import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--current-board-height), 1fr)',
  width: '70vh',
  height: '70vh',
});
