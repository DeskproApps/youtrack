
import { AppFrame } from '@deskpro/apps-components';
import { createApp } from '@deskpro/apps-sdk';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from "react-redux";

import './styles.css';
import App from './App';
import store from './store';
import {setAuthClient, setRestApi, setStorageClient} from "./utils";

createApp(dpapp => props => {

  setRestApi(dpapp.restApi);
  setAuthClient(dpapp.oauth);
  setStorageClient(dpapp.storage);

  ReactDOM.render(
    <AppFrame {...props}>
      <Provider store={store}>
        <App dpapp={dpapp} />
      </Provider>
    </AppFrame>,
    document.getElementById('root')
  )
});
