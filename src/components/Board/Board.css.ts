import { style } from '@vanilla-extract/css';
import { elevation, vars } from '@/styles/theme.css';

export const container = style([
  elevation,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--current-board-height), 1fr)',
    width: '70vh',
    height: '70vh',
    padding: vars.spacing.medium,
  },
]);
