import React, { useEffect } from 'react';
import '../assets/styles/styles.scss';
import { HttpClient } from '../core/httpClient/httpClient';
import http from '../http/http';

const App: React.FunctionComponent = () => {
  useEffect(() => {
    console.log(HttpClient.httpConfig.authConfig)
  }, [])

  const onClick = () => {
    http.Employee.getEmployees();
  }

  return (
    <div className="App">
      <button onClick={onClick}>Click</button>
    </div>
  );
}

export default App;
