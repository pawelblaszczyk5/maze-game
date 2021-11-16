import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const resultText = style({
  fontSize: vars.fontSize.large,
  margin: `${vars.spacing.medium} 0 0`,
});
