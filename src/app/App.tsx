import { CssBaseline } from '@material-ui/core';
import ProvidersGroup from 'core/components/ProviderFactory/ProvidersFactory';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLoading, Shell } from 'shared/components';
import { LoadingProvider } from 'shared/providers/LoadingProviders';
import AppRouter from './AppRouting';

const providers = [LoadingProvider];

const App: React.FunctionComponent = () => (
  <>
    <Suspense fallback={<PageLoading loading={true} />}>
      <ProvidersGroup providers={providers}>
        <CssBaseline />
        <Router>
          <Shell>
            <AppRouter />
          </Shell>
        </Router>
      </ProvidersGroup>
    </Suspense>
  </>
);

export default App;
