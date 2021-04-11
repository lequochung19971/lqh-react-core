import { CssBaseline } from '@material-ui/core';
import ProvidersGroup from '@core/components/ProviderFactory/ProvidersFactory';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLoading, Shell } from '@shared/components';
import { LoadingProvider } from '@shared/providers/LoadingProviders';
import AppRouting from './AppRouting';
import store from '@store/store';
import { Provider } from 'react-redux';

const providers = [LoadingProvider];

const App: React.FunctionComponent = () => (
  <>
    <Provider store={store}>
      <Suspense fallback={<PageLoading loading={true} />}>
        <ProvidersGroup providers={providers}>
          <CssBaseline />
          <Router>
            <Shell>
              <AppRouting />
            </Shell>
          </Router>
        </ProvidersGroup>
      </Suspense>
    </Provider>
  </>
);

export default App;
