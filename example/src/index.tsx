import React from 'react';
import ReactDOM from 'react-dom';
import NetworkCheck from "../../src/index";
import {SnackbarProvider} from '../../node_modules/notistack/dist/index';

ReactDOM.render(
    <React.Fragment>
        Network Check Example
        <SnackbarProvider>
            <NetworkCheck intervalMs={1000} baseUrl={'https://dev-jakub.datim.org/'} networkCheckTimeoutS={20}/>
        </SnackbarProvider>
    </React.Fragment>,
    document.getElementById('root')
);
