import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageLoading, ProvidersGroup } from '@shared/components';
import { DialogProvider } from '@shared/components/Dialog/DialogContext';
import { withProvider } from '@shared/components/ProvidersGroup/withProvider';
import { LoadingProvider } from '@shared/contexts';
import ThemeProvider from '@shared/styles/theme/ThemeProvider';
import { Provider, store } from '@store';
import AppInit from './AppInit';
import AppRouting from './AppRouting';

AppInit();
const providers: React.ComponentType[] = [
  withProvider<{ store: typeof store }>(Provider, { store }),
  withProvider(LoadingProvider),
  ThemeProvider,
];

const App: React.FunctionComponent = () => {
  return (
    <ProvidersGroup providers={providers}>
      <Suspense fallback={<PageLoading loading={true} />}>
        <DialogProvider>
          <BrowserRouter>
            <AppRouting />
          </BrowserRouter>
        </DialogProvider>
      </Suspense>
    </ProvidersGroup>
  );
};

export default App;
