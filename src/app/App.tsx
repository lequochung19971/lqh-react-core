import { CssBaseline } from '@material-ui/core';
import ProvidersFactory from 'core/components/ProviderFactory/ProvidersFactory';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Shell } from 'shared/components';
import { LoadingProvider } from 'shared/providers/loadingProviders';
import AppRouter from './AppRouting';

const providers = [LoadingProvider];

const App: React.FunctionComponent = () => (
  <>
    <Suspense fallback={<div>Loading ...</div>}>
      <ProvidersFactory providers={providers}>
        <CssBaseline></CssBaseline>
        <Router>
          <Shell>
            <AppRouter />
          </Shell>
        </Router>
      </ProvidersFactory>
    </Suspense>
  </>
);

export default App;
