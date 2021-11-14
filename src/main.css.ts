import { vars } from '@/styles/theme.css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body', {
  background: vars.color.dark.main,
  color: vars.color.light.main,
  margin: vars.spacing.xlarge,
  lineHeight: '170%',
});
