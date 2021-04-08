import React, { useEffect } from 'react';
import { PageLoading } from 'shared/components';
import { useLoadingContext } from 'shared/providers/LoadingProviders';

const SamplePage: React.FunctionComponent = () => {
  const { setIsPageLoading } = useLoadingContext();
  return (
    <>
      <button onClick={() => setIsPageLoading(true)}>Click me!!!!</button>
    </>
  );
};

export default SamplePage;
