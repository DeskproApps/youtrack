
import { youtrackFetchIssues, youtrackCreateIssue } from '../../main/javascript/api';
import { fixtures } from './api.fixtures.js'

test('successfully retrieve issues', done => {
  fetch.mockResponse(JSON.stringify(fixtures));

  return youtrackFetchIssues().then(resp => {
      expect(resp).toEqual(fixtures);

      fetch.resetMocks();
      done();
    }).catch(err => { done(); })
});

test('unsuccessfully retrieve issues', done => {
  const error = { message: "There was an error" };
  fetch.mockReject(error);

  return youtrackFetchIssues()
    .then(resp => { done(); })
    .catch(err => {
      expect(err).toEqual(error);

      fetch.resetMocks();
      done();
    });
});

test('successfully create an issue with a fully payload', done => {
  const success = { message: 'An issue was successfully created' };
  const payload = {
    project: 'Doom',
    summary: 'The end of everything',
    desc: 'Burn'
  };
  fetch.mockResponse(JSON.stringify({ message: success.message, payload }));

  return youtrackCreateIssue(payload)
    .then(resp => {
      expect(resp.message).toEqual(success.message);
      expect(resp.payload).toEqual(payload);

      fetch.resetMocks();
      done();
    })
    .catch(err => { done(); });
});

test('unsuccessfully create an issue without a payload', done => {
  const error = { message: 'Missing or misspelt parameters: project, summary, desc' };

  return youtrackCreateIssue()
    .then(resp => { done(); })
    .catch(err => {
      err = JSON.parse(err);
      expect(err.message).toEqual(error.message);

      done();
    });
});

test('unsuccessfully create an issue', done => {
  const error = { message: 'There was an error' };
  const payload = {
    project: 'Doom',
    summary: 'The end of everything',
    desc: 'Burn'
  };
  fetch.mockReject(JSON.stringify({ message: error.message, payload }));

  return youtrackCreateIssue(payload)
    .then(resp => { done(); })
    .catch(err => {
      err = JSON.parse(err);
      expect(err.message).toEqual(error.message);
      expect(err.payload).toEqual(payload);

      fetch.resetMocks();
      done();
    });
});
