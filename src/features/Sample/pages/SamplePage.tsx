import React from 'react';
import { useAppDispatch } from '@store/hooks';
import { pageLoading } from '@shared/slices/loadingSlices';

const SamplePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <button onClick={() => dispatch(pageLoading.open())}>Click me!!!!</button>
    </>
  );
};

export default SamplePage;
