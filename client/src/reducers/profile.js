import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_USER_PROFILE_EXPERIENCE_EDUCATION,
  UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
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
        profile: payload,
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
        repos: [],
        loading: false,
        error: {},
      };
    default:
      return state;
  }
}
