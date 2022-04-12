import { css } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * This function is used to convert hex color to lighten or darken
 * @param color Hex color
 * @param percent percent of color (Ex: lighten: 0.1, 0.2, 0.3, ... | darken: -0.1, -0.2, ...)
 * @returns Hex color was converted
 */
function shadeHexColor(color: string, percent: number) {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

const statusIconSize = '5em';
const statusIconAnimations = true;
const statusIconMargin = '0.6em auto .6em';
const statusIconFontFamily = 'inherit';
const statusIconFontSize = '3.75em';
const statusIconBorderColor = '#000';
const statusIconZoom = null;
const statusSuccess = '#a5dc86';
const statusSuccessBorder = `${statusSuccess}4d`; // 4d = 30
const statusError = '#f27474';
const statusWarning = '#f8bb86';
const statusInfo = '#3fc3ee';
const statusQuestion = '#87adbd';

const StatusIconStyled = styled.div`
  .status-icon {
    position: relative;
    box-sizing: content-box;
    justify-content: center;
    width: ${statusIconSize};
    height: ${statusIconSize};
    margin: ${statusIconMargin};
    zoom: ${statusIconZoom};
    border: 0.25em solid transparent;
    border-radius: 50%;
    border-color: ${statusIconBorderColor};
    font-family: ${statusIconFontFamily};
    line-height: ${statusIconSize};
    cursor: default;
    user-select: none;
    display: flex;

    .status-icon-content {
      display: flex;
      align-items: center;
      font-size: ${statusIconFontSize};
    }

    &.status-error {
      border-color: ${statusError};
      color: ${statusError};

      .status-x-mark {
        position: relative;
        flex-grow: 1;
      }

      [class^='status-x-mark-line'] {
        display: block;
        position: absolute;
        top: 2.3125em;
        width: 2.9375em;
        height: 0.3125em;
        border-radius: 0.125em;
        background-color: ${statusError};

        &[class$='left'] {
          left: 1.0625em;
          transform: rotate(45deg);
        }

        &[class$='right'] {
          right: 1em;
          transform: rotate(-45deg);
        }
      }

      // Error icon animation
      &.status-icon-show {
        ${statusIconAnimations
          ? css`
              animation: status-animate-error-icon 0.5s;

              .status-x-mark {
                animation: status-animate-error-x-mark 0.5s;
              }
            `
          : ''}
      }
    }

    &.status-warning {
      border-color: ${shadeHexColor(statusWarning, 0.3)};
      color: ${statusWarning};

      // Warning icon animation
      &.status-icon-show {
        ${statusIconAnimations
          ? css`
              animation: status-animate-error-icon 0.5s;

              .status-icon-content {
                animation: status-animate-i-mark 0.5s;
              }
            `
          : ''}
      }
    }

    &.status-info {
      border-color: ${shadeHexColor(statusInfo, 0.5)};
      color: ${statusInfo};

      // Info icon animation
      &.status-icon-show {
        ${statusIconAnimations
          ? css`
              animation: status-animate-error-icon 0.5s;

              .status-icon-content {
                animation: status-animate-i-mark 0.8s;
              }
            `
          : ''}
      }
    }

    &.status-question {
      border-color: ${shadeHexColor(statusQuestion, 0.5)};
      color: ${statusQuestion};

      // Question icon animation
      &.status-icon-show {
        ${statusIconAnimations
          ? css`
              animation: status-animate-error-icon 0.5s;

              .status-icon-content {
                animation: status-animate-question-mark 0.8s;
              }
            `
          : ''}
      }
    }

    &.status-success {
      border-color: ${statusSuccess};
      color: ${statusSuccess};

      [class^='status-success-circular-line'] {
        // Emulate moving circular line
        position: absolute;
        width: 3.75em;
        height: 7.5em;
        transform: rotate(45deg);
        border-radius: 50%;

        &[class$='left'] {
          top: -0.4375em;
          left: -2.0635em;
          transform: rotate(-45deg);
          transform-origin: 3.75em 3.75em;
          border-radius: 7.5em 0 0 7.5em;
        }

        &[class$='right'] {
          top: -0.6875em;
          left: 1.875em;
          transform: rotate(-45deg);
          transform-origin: 0 3.75em;
          border-radius: 0 7.5em 7.5em 0;
        }
      }

      .status-success-ring {
        // Ring
        position: absolute;
        z-index: 2;
        top: -0.25em;
        left: -0.25em;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
        border: 0.25em solid ${statusSuccessBorder};
        border-radius: 50%;
      }

      .status-success-fix {
        // Hide corners left from animation
        position: absolute;
        z-index: 1;
        top: 0.5em;
        left: 1.625em;
        width: 0.4375em;
        height: 5.625em;
        transform: rotate(-45deg);
      }

      [class^='status-success-line'] {
        display: block;
        position: absolute;
        z-index: 2;
        height: 0.3125em;
        border-radius: 0.125em;
        background-color: ${statusSuccess};

        &[class$='tip'] {
          top: 2.875em;
          left: 0.8125em;
          width: 1.5625em;
          transform: rotate(45deg);
        }

        &[class$='long'] {
          top: 2.375em;
          right: 0.5em;
          width: 2.9375em;
          transform: rotate(-45deg);
        }
      }

      // Success icon animation
      &.status-icon-show {
        ${statusIconAnimations
          ? css`
              .status-success-line-tip {
                animation: status-animate-success-line-tip 0.75s;
              }

              .status-success-line-long {
                animation: status-animate-success-line-long 0.75s;
              }

              .status-success-circular-line-right {
                animation: status-rotate-success-circular-line 4.25s ease-in;
              }
            `
          : ''}
      }
    }
  }

  @keyframes status-animate-error-icon {
    0% {
      transform: rotateX(100deg);
      opacity: 0;
    }

    100% {
      transform: rotateX(0deg);
      opacity: 1;
    }
  }

  @keyframes status-rotate-loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  // Error icon animations
  @keyframes status-animate-error-x-mark {
    0% {
      margin-top: 1.625em;
      transform: scale(0.4);
      opacity: 0;
    }

    50% {
      margin-top: 1.625em;
      transform: scale(0.4);
      opacity: 0;
    }

    80% {
      margin-top: -0.375em;
      transform: scale(1.15);
    }

    100% {
      margin-top: 0;
      transform: scale(1);
      opacity: 1;
    }
  }

  // Info and Warning mark animation
  @keyframes status-animate-i-mark {
    0% {
      transform: rotateZ(45deg);
      opacity: 0;
    }

    25% {
      transform: rotateZ(-25deg);
      opacity: 0.4;
    }

    50% {
      transform: rotateZ(15deg);
      opacity: 0.8;
    }

    75% {
      transform: rotateZ(-5deg);
      opacity: 1;
    }

    100% {
      transform: rotateX(0);
      opacity: 1;
    }
  }

  // Question mark animation
  @keyframes status-animate-question-mark {
    0% {
      transform: rotateY(-360deg);
    }

    100% {
      transform: rotateY(0);
    }
  }

  // Success icon animations
  @keyframes status-animate-success-line-tip {
    0% {
      top: 1.1875em;
      left: 0.0625em;
      width: 0;
    }

    54% {
      top: 1.0625em;
      left: 0.125em;
      width: 0;
    }

    70% {
      top: 2.1875em;
      left: -0.375em;
      width: 3.125em;
    }

    84% {
      top: 3em;
      left: 1.3125em;
      width: 1.0625em;
    }

    100% {
      top: 2.8125em;
      left: 0.8125em;
      width: 1.5625em;
    }
  }

  @keyframes status-animate-success-line-long {
    0% {
      top: 3.375em;
      right: 2.875em;
      width: 0;
    }

    65% {
      top: 3.375em;
      right: 2.875em;
      width: 0;
    }

    84% {
      top: 2.1875em;
      right: 0;
      width: 3.4375em;
    }

    100% {
      top: 2.375em;
      right: 0.5em;
      width: 2.9375em;
    }
  }

  @keyframes status-rotate-success-circular-line {
    0% {
      transform: rotate(-45deg);
    }

    5% {
      transform: rotate(-45deg);
    }

    12% {
      transform: rotate(-405deg);
    }

    100% {
      transform: rotate(-405deg);
    }
  }
`;

export const ErrorIcon: React.FunctionComponent = () => {
  return (
    <StatusIconStyled>
      <div className="status-icon status-error status-icon-show">
        <span className="status-x-mark">
          <span className="status-x-mark-line-left"></span>
          <span className="status-x-mark-line-right"></span>
        </span>
      </div>
    </StatusIconStyled>
  );
};

export const SuccessIcon: React.FunctionComponent = () => {
  return (
    <StatusIconStyled>
      <div className="status-icon status-success status-icon-show">
        <div className="status-success-circular-line-left" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
        <span className="status-success-line-tip"></span> <span className="status-success-line-long"></span>
        <div className="status-success-ring"></div>{' '}
        <div className="status-success-fix" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
        <div className="status-success-circular-line-right" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></div>
      </div>
    </StatusIconStyled>
  );
};

export const WarningIcon: React.FunctionComponent = () => {
  return (
    <StatusIconStyled>
      <div className="status-icon status-warning status-icon-show">
        <div className="status-icon-content">!</div>
      </div>
    </StatusIconStyled>
  );
};

export const InfoIcon: React.FunctionComponent = () => {
  return (
    <StatusIconStyled>
      <div className="status-icon status-info status-icon-show">
        <div className="status-icon-content">i</div>
      </div>
    </StatusIconStyled>
  );
};

export const QuestionIcon: React.FunctionComponent = () => {
  return (
    <StatusIconStyled>
      <div className="status-icon status-question status-icon-show">
        <div className="status-icon-content">?</div>
      </div>
    </StatusIconStyled>
  );
};

const statusIcons = {
  error: ErrorIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  info: InfoIcon,
  question: QuestionIcon,
};

type StatusIconsProps = {
  type?: 'error' | 'warning' | 'success' | 'info' | 'question';
};
const StatusIcons: React.FunctionComponent<StatusIconsProps> = ({ type }) => {
  const Icon = type ? statusIcons[type] : null;
  return Icon && <Icon />;
};

export default StatusIcons;
