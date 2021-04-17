import { CssBaseline } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLoading, ProvidersGroup, Shell } from '@shared/components';
import { LoadingProvider } from '@shared/providers';
import AppRouting from './AppRouting';
import { Provider, store } from '@store';
import AppInit from './AppInit';

AppInit();
const providers = [LoadingProvider];

const App: React.FunctionComponent = () => (
  <>
    <Provider store={store}>
      <ProvidersGroup providers={providers}>
        <CssBaseline />
        <Router>
          <Shell>
            <Suspense fallback={<PageLoading loading={true} />}>
              <AppRouting />
            </Suspense>
          </Shell>
        </Router>
      </ProvidersGroup>
    </Provider>
  </>
);

export default App;
