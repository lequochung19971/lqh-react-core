import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLoading, ProvidersGroup, Shell } from '@shared/components';
import { LoadingProvider } from '@shared/contexts';
import AppRouting from './AppRouting';
import { Provider, ProviderProps, store } from '@store';
import AppInit from './AppInit';
import ThemeProvider from '@shared/styles/theme/ThemeProvider';
import { withProvider } from '@shared/components/ProvidersGroup/withProvider';

AppInit();
const providers: React.FunctionComponent[] = [
  withProvider<ProviderProps, typeof Provider>(Provider, { store }),
  withProvider<{ test: boolean }, any>(LoadingProvider, { test: true }),
  ThemeProvider,
];

const App: React.FunctionComponent = () => (
  <>
    <ProvidersGroup providers={providers}>
      <Router>
        <Shell>
          <Suspense fallback={<PageLoading loading={true} />}>
            <AppRouting />
          </Suspense>
        </Shell>
      </Router>
    </ProvidersGroup>
  </>
);

export default App;
