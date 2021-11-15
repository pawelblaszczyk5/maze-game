import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const singleCell = style({
  border: `1px solid ${vars.color.accent.warm.main}`,
});
