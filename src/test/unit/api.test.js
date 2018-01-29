
import { fetchIssues, createIssue, deleteIssue } from '../../main/javascript/api';
import { fixtures } from './api.fixtures';

test('successfully retrieve issues', done => {
  fetch.mockResponse(JSON.stringify(fixtures));

  return fetchIssues().then(resp => {
    expect(resp).toEqual(fixtures);

    fetch.resetMocks();
    return done();
  }).catch(() => { done(); });
});

test('unsuccessfully retrieve issues', done => {
  const error = { message: 'There was an error' };
  fetch.mockReject(error);

  return fetchIssues()
    .then(() => { return done(); })
    .catch(err => {
      expect(err).toEqual(error);

      fetch.resetMocks();
      return done();
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

  return createIssue(payload)
    .then(resp => {
      expect(resp.message).toEqual(success.message);
      expect(resp.payload).toEqual(payload);

      fetch.resetMocks();
      return done();
    })
    .catch(() => { done(); });
});

test('unsuccessfully create an issue without a payload', done => {
  const error = { message: 'Missing parameters: project, summary, desc' };

  return createIssue()
    .then(() => { return done(); })
    .catch(err => {
      expect(JSON.parse(err).message).toEqual(error.message);
      return done();
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

  return createIssue(payload)
    .then(() => { return done(); })
    .catch(err => {
      const er = JSON.parse(err);
      expect(er.message).toEqual(error.message);
      expect(er.payload).toEqual(payload);

      fetch.resetMocks();
      done();
    });
});

test('successfully delete an issue with a fully payload', done => {
  const success = { message: 'An issue was successfully deleted' };
  const payload = 'TST-123';
  fetch.mockResponse(JSON.stringify({ message: success.message, payload }));

  return deleteIssue(payload)
    .then(resp => {
      expect(resp.message).toEqual(success.message);
      expect(resp.payload).toEqual(payload);

      fetch.resetMocks();
      return done();
    })
    .catch(() => { done(); });
});

test('unsuccessfully delete an issue without a payload', done => {
  const error = { message: 'Missing parameter: issue' };

  return deleteIssue()
    .then(() => { return done(); })
    .catch(err => {
      expect(JSON.parse(err).message).toEqual(error.message);

      return done();
    });
});

test('unsuccessfully delete an issue', done => {
  const error = { message: 'There was an error' };
  const payload = 'TST-123';
  fetch.mockReject(JSON.stringify({ message: error.message, payload }));

  return deleteIssue(payload)
    .then(() => { return done(); })
    .catch(err => {
      const er = JSON.parse(err);
      expect(er.message).toEqual(error.message);
      expect(er.payload).toEqual(payload);

      fetch.resetMocks();
      done();
    });
});
