import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.xlarge,
  maxWidth: '1200px',
  margin: '0 auto',
});

export const screenDisclaimer = style({
  textAlign: 'center',
  fontSize: vars.fontSize.xlarge,
  marginTop: vars.spacing.xxlarge,
});
