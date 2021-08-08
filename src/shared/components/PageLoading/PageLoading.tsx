import { Backdrop, styled } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { selectIsPageLoading } from '@store/loading/selectors';
import { useSelector } from '@store';

const StyledBackdrop = styled(Backdrop)({
  zIndex: 9999,
  backgroundColor: 'rgb(255, 255, 255, 0.6)',
});
interface PageLoadingProps {
  loading?: boolean;
}

const PageLoading: React.FunctionComponent<PageLoadingProps> = ({ loading = false }) => {
  const isPageLoading = useSelector(selectIsPageLoading);
  return (
    <StyledBackdrop open={loading || isPageLoading}>
      <CircularProgress size={80} />
    </StyledBackdrop>
  );
};

export default PageLoading;
