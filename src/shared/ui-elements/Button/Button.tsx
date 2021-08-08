import { Button, styled } from '@material-ui/core';
import {
  compose,
  breakpoints,
  spacing,
  border,
  display,
  flexbox,
  positions,
  shadows,
  sizing,
  typography,
} from '@material-ui/system';

export const LqhButton = styled(Button)(
  breakpoints(compose(spacing, border, display, flexbox, positions, shadows, sizing, typography)),
);
