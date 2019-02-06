
import { DefaultDeskproApp } from '@deskpro/apps-components';
import { createApp } from '@deskpro/apps-sdk';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from "react-redux";

import './styles.css';
import App from './App';
import createAppStore from './store';
import {setAuthClient, setRestApi, setStorageClient} from "./utils";
import AppPlaceholder from './ui/AppPlaceholder';
import * as phrasePacks from './locales/**/*.{json,yaml,yml}';

createApp(dpapp => props => {

  setRestApi(dpapp.restApi);
  setAuthClient(dpapp.oauth);
  setStorageClient(dpapp.storage);
  const store = createAppStore();

  ReactDOM.render(
    <DefaultDeskproApp dpapp={dpapp} phrasePacks={phrasePacks} {...props}>
      <Provider store={store}>
        {dpapp.getProperty('isPreRender') ? <AppPlaceholder dpapp={dpapp} /> : <App dpapp={dpapp} />}
      </Provider>
    </DefaultDeskproApp>,
    document.getElementById('root')
  )
});
