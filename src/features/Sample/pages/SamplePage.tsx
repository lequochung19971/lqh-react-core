import React, { useEffect } from 'react';
import { useLoadingContext } from 'shared/providers/loadingProviders';

const SamplePage: React.FunctionComponent = () => {
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return <button onClick={() => setIsLoading(!isLoading)}>Click me!!!!</button>;
};

export default SamplePage;
