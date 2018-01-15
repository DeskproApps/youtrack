
import { youtrackFetchIssues } from '../../main/javascript/api';
import { fixtures } from './api.fixtures.js'

test('successfully retrieve issues', done => {
  fetch.mockResponse(JSON.stringify(fixtures));

  return youtrackFetchIssues().then(resp => {
      expect(resp).toEqual(fixtures)

      fetch.resetMocks();
      done();
    }).catch(err => { done(); })
});

test('unsuccessfully retrieve issues', done => {
  const error = { message: "There was an error" };
  fetch.mockReject(error);

  return youtrackFetchIssues().then(resp => { done(); })
    .catch(err => {
      expect(err).toEqual(error);

      fetch.resetMocks();
      done();
    })
});
