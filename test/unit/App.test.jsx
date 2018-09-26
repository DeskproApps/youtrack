
import React from 'react';
import { mount, shallow } from 'enzyme';
import '../setup';
import App from '../../src/App';
import { AppFrame } from '@deskpro/apps-components';
import { createAppFromProps } from '@deskpro/apps-sdk';
import { Provider } from "react-redux";

import store from '../../src/store';
import {setAuthClient, setRestApi, setStorageClient} from "../../src/utils";

test('successfully render the application in initial state', () => {

  const dpapp = createAppFromProps({
    instanceProps: {
      appId:          '1',
      appTitle:       'title',
      appPackageName: 'com.deskpro.app',
      instanceId:     '1',
    },
    contextProps: {
      type: 'ticket',
      entityId: '1',
      locationId: '1',
      tabId: 'tab-1',
      tabUrl: 'https://127.0.0.1',
    }
  });

  setRestApi(dpapp.restApi);
  setAuthClient(dpapp.oauth);
  setStorageClient(dpapp.storage);

  const wrapper = mount(
    <AppFrame iconUrl={"../../public/icon.png"} title={"my app"} >
    <Provider store={store}>
        <App dpapp={dpapp} />
      </Provider>
    </AppFrame>,
  );

  wrapper.html();
});
