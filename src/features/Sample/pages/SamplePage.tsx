import React, { Suspense } from 'react';
import { useDispatch } from '@store';
import { styled } from '@material-ui/core';

const Wrapper = styled('div')({
  '& img': {
    width: '100%',
  },
});

const SamplePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    setTimeout(() => {
      console.log('TImeout');
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
