import { CssBaseline } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Shell } from 'shared/components';
import AppRouter from './AppRouting';

const App: React.FunctionComponent = () => (
  <>
    <Suspense fallback={<div>Loading ...</div>}>
      <CssBaseline></CssBaseline>
      <Router>
        <Shell>
          <AppRouter />
        </Shell>
      </Router>
    </Suspense>
  </>
);

export default App;
