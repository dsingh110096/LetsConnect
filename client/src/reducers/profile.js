import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_USER_PROFILE_EXPERIENCE_EDUCATION,
  UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case ADD_USER_PROFILE_EXPERIENCE_EDUCATION:
    case UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION:
      return {
        ...state,
        profile: payload.data,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: null,
        loading: false,
        error: {},
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
