
import React from 'react';
import { mount, shallow } from 'enzyme';
import '../setup';
import AdminSettings from '../../src/ui/AdminSettings';
const TestComponent = () => <div className="dummyForm" />;

test('render the settings screen in loading state', done => {

  const props = {
    finishInstall: () => Promise.resolve({ onStatus: () => {} }),
    installType: 'install',
    settings: ['test'],
    values: [],
    settingsForm: TestComponent,
    dpapp: {
      oauth: {
        settings: (val) => new Promise((resolve, reject) => { // Keep promise pending
          if (val === '') return resolve();
          else if (val === '') return reject();
        })
      }
    }
  };

  const wrapper = mount(<AdminSettings {...props} />);

  expect(wrapper.state('oauthSettings')).toBeNull();
  expect(wrapper.state('error')).toBeNull();
  expect(wrapper.find('TestComponent').prop('values').urlRedirect).toBe('Loading...');

  wrapper.unmount();
  done();
});

test('render the settings screen in error state', done => {

  const props = {
    finishInstall: () => Promise.resolve({ onStatus: () => {} }),
    installType: 'install',
    settings: ['test'],
    values: [],
    settingsForm: TestComponent,
    dpapp: {
      oauth: {
        settings: () => Promise.reject(new Error())
      }
    }
  };

  const wrapper = mount(<AdminSettings {...props} />);

  expect(wrapper.state('oauthSettings')).toBeNull();
  expect(wrapper.state('error')).toBeNull();

  wrapper.setState({ oauthSettings: null, error: new Error() }, () => {
    expect(wrapper.state('oauthSettings')).toBeNull();
    expect(wrapper.state('error')).toBeInstanceOf(Error);
    expect(wrapper.find('TestComponent').prop('values').urlRedirect).toBe('Not Available');
    done();
  });
});

test('render the settings screen in successful ready state', done => {

  const props = {
    finishInstall: () => Promise.resolve({ onStatus: () => {} }),
    installType: 'install',
    settings: ['test'],
    values: [],
    settingsForm: TestComponent,
    dpapp: {
      oauth: {
        settings: () => Promise.resolve({ urlRedirect: 'test' })
      }
    }
  };

  const wrapper = mount(<AdminSettings {...props} />);

  expect(wrapper.state('oauthSettings')).toBeNull();
  expect(wrapper.state('error')).toBeNull();

  wrapper.setState({ oauthSettings: { urlRedirect: 'test' }, error: null }, () => {
    expect(wrapper.state('oauthSettings').urlRedirect).toBe('test');
    expect(wrapper.state('error')).toBeNull();
    expect(wrapper.find('TestComponent').prop('values').urlRedirect).toBe('test');

    done();
  });
});
