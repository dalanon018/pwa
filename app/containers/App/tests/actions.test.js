import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SET_CURRENT_SESSION
} from '../constants'

import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
  setCurrentSessionAction
} from '../actions'

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_REPOS
      }

      expect(loadRepos()).toEqual(expectedResult)
    })
  })

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test']
      const username = 'test'
      const expectedResult = {
        type: LOAD_REPOS_SUCCESS,
        repos: fixture,
        username
      }

      expect(reposLoaded(fixture, username)).toEqual(expectedResult)
    })
  })

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!'
      }
      const expectedResult = {
        type: LOAD_REPOS_ERROR,
        error: fixture
      }

      expect(repoLoadingError(fixture)).toEqual(expectedResult)
    })
  })

  describe('Session', () => {
    it('should set current session', () => {
      const payload = '1232131231312'
      const expectedResult = {
        type: SET_CURRENT_SESSION,
        payload
      }

      expect(setCurrentSessionAction(payload)).toEqual(expectedResult)
    })
  })
})
