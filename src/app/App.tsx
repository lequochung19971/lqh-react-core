import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLoading, ProvidersGroup, Shell } from '@shared/components';
import { LoadingProvider } from '@shared/contexts';
import AppRouting from './AppRouting';
import { Provider, store } from '@store';
import AppInit from './AppInit';
import ThemeProvider from '@shared/styles/theme/ThemeProvider';

AppInit();
const providers = [LoadingProvider, ThemeProvider];

const App: React.FunctionComponent = () => (
  <>
    <Provider store={store}>
      <ProvidersGroup providers={providers}>
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
