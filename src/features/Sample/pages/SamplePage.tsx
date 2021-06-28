import React, { Suspense } from 'react';
import { useDispatch } from '@store';
import { styled } from '@material-ui/core';
import { pageLoading } from '@store/loading/slices';

const Wrapper = styled('div')({
  '& img': {
    width: '100%',
  },
});

const SamplePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(pageLoading.open());
    setTimeout(() => {
      dispatch(pageLoading.close());
    }, 2000);
  };

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Wrapper>
        <button onClick={onClick}>Click me!!!!</button>
      </Wrapper>
    </Suspense>
  );
};

export default SamplePage;
