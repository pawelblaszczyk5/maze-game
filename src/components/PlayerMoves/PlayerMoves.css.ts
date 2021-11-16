import { style } from '@vanilla-extract/css';
import { elevation, vars } from '@/styles/theme.css';

export const arrowTile = style([
  elevation,
  {
    padding: vars.spacing.small,
    fontSize: vars.fontSize.xlarge,
    color: vars.color.feedback.info.main,
  },
]);

export const arrowTileInvalid = style({
  color: vars.color.feedback.error.main,
});

export const arrowsContainer = style({
  display: 'flex',
  gap: vars.spacing.xlarge,
});
