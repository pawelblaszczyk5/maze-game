import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const singleCell = style({
  border: `1px solid ${vars.color.accent.warm.main}`,
});

export const singleCellSolutionPart = style({
  backgroundColor: vars.color.accent.warm.secondary,
});

export const singleCellMazeEnd = style({
  backgroundColor: vars.color.accent.cold.main,
});

export const singleCellCurrentlyVisited = style({
  backgroundColor: vars.color.light.secondary,
});
