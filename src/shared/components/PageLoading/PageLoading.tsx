import { Backdrop, styled } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { useLoadingContext } from 'shared/providers/LoadingProviders';

const StyledBackdrop = styled(Backdrop)({
  zIndex: 9999,
  backgroundColor: 'rgb(255, 255, 255, 0.6)',
});

interface PageLoadingProps {
  loading?: boolean;
}

const PageLoading: React.FunctionComponent<PageLoadingProps> = ({ loading = false }) => {
  const { isPageLoading } = useLoadingContext();
  return (
    <StyledBackdrop open={loading || isPageLoading}>
      <CircularProgress />
    </StyledBackdrop>
  );
};

export default PageLoading;