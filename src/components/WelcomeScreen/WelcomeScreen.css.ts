import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const description = style({
  maxWidth: '600px',
  textAlign: 'center',
  fontSize: vars.fontSize.medium,
});

export const heading = style({
  fontSize: vars.fontSize.xxlarge,
  textAlign: 'center',
  color: vars.color.accent.warm.secondary,
});
