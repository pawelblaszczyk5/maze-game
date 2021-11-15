import { style } from '@vanilla-extract/css';
import { focus, vars } from '@/styles/theme.css';

export const button = style([
  focus,
  {
    padding: `${vars.spacing.small} ${vars.spacing.large}`,
    border: 'none',
    background: vars.color.light.main,
    color: vars.color.dark.main,
    fontSize: vars.fontSize.medium,
    borderRadius: '0.25rem',
    ':hover': {
      background: vars.color.light.secondary,
    },
  },
]);
