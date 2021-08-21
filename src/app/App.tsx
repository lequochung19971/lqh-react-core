import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PageLoading, ProvidersGroup } from '@shared/components';
import { withProvider } from '@shared/components/ProvidersGroup/withProvider';
import { RouterProvider } from '@shared/components/Routers/RouterContext';
import { LoadingProvider } from '@shared/contexts';
import ThemeProvider from '@shared/styles/theme/ThemeProvider';

import { Provider, ProviderProps, store } from '@store';

import AppInit from './AppInit';
import AppRouting from './AppRouting';

AppInit();
const providers: React.FunctionComponent[] = [
  withProvider<ProviderProps, typeof Provider>(Provider, { store }),
  withProvider<{ test: boolean }, any>(LoadingProvider, { test: true }),
  ThemeProvider,
];

const App: React.FunctionComponent = () => {
  return (
    <ProvidersGroup providers={providers}>
      <Suspense fallback={<PageLoading loading={true} />}>
        <RouterProvider>
          <BrowserRouter>
            <AppRouting />
          </BrowserRouter>
        </RouterProvider>
      </Suspense>
    </ProvidersGroup>
  );
};

export default App;
