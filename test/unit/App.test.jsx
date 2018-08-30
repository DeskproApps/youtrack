import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../../main/javascript/App';
import { createAppFromProps } from '@deskpro/apps-sdk-core';
import { DeskproSDK, configureStore } from '@deskpro/apps-sdk-react';
import { WidgetWindowBridge } from '@deskpro/apps-sdk-core/lib/main/javascript/Widget/WidgetWindowBridge.js'

test('successfully render the application in initial state', () => {

  const contextProps = {
    // context
    type: 'ticket',
    entityId: '1',
    locationId: 'ticket-sidebar',
    tabId: 'tab-id',
    tabUrl: 'http://127.0.0.1',
    route: {
      location
    }
  };

  const instanceProps = {
    appId: '1',
    appTitle: 'My First App',
    appPackageName: 'apps-boilerplate',
    instanceId: '1'
  };

  const dpapp = createAppFromProps({ widgetWindow: null, contextProps, instanceProps });
  dpapp.manifest = {
    storage: []
  };

  const store = configureStore(dpapp);
  const wrapper = mount(
    <DeskproSDK dpapp={dpapp} store={store}>
      <App />
    </DeskproSDK>,
  );

  wrapper.html();
});
