import React from 'react';
import { useDispatch } from '@store';
import { pageLoading } from '@shared/slices';

const SamplePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(pageLoading.open())}>Click me!!!!</button>
    </>
  );
};

export default SamplePage;
