import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonsContainer = style({
  display: 'flex',
  gap: vars.spacing.xlarge,
});
