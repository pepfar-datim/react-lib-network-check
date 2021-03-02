import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NetworkCheck from '../.';

const App = () => {
  return (
    <div>
        Network check demo
        <NetworkCheck intervalMs={1000} baseUrl={'https://dev-jakub.datim.org/'} networkCheckTimeoutS={60} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
