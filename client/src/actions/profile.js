import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  ADD_USER_PROFILE_EXPERIENCE_EDUCATION,
  UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from '../actions/types';

//Get all user profiles
export const getAllUserProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/v1/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Get profile by user id
export const getProfileByUserId = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/user/${user_id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};
//Get profile by user id
export const getUserGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Get current logged in user profile
export const getCurrentLoggedInUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Create or update user profile
export const createOrUpdateUserProfile = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (edit || !edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) dispatch(setAlert(errors, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Add User Profile Experience
export const addUserProfileExperience = (formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/v1/profile/experience', formData, config);

    dispatch({
      type: ADD_USER_PROFILE_EXPERIENCE_EDUCATION,
      payload: res.data,
    });

    dispatch(setAlert('New Experience Added ', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) dispatch(setAlert(errors, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Update User Profile Experience
export const updateUserProfileExperience = (formData, id, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/v1/profile/experience/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION,
      payload: res.data,
    });

    dispatch(setAlert('Experience Updated', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) dispatch(setAlert(errors, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Delete user profile experience
export const deleteUserProfileExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Add User Profile Education
export const addUserProfileEducation = (formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/v1/profile/education', formData, config);

    dispatch({
      type: ADD_USER_PROFILE_EXPERIENCE_EDUCATION,
      payload: res.data,
    });

    dispatch(setAlert('New Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) dispatch(setAlert(errors, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Update User Profile Education
export const updateUserProfileEducation = (formData, id, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/v1/profile/education/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_PROFILE_EXPERIENCE_EDUCATION,
      payload: res.data,
    });

    dispatch(setAlert('Education Updated', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) dispatch(setAlert(errors, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Delete user profile education
export const deleteUserProfileEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};

//Delete user account cascades its profile and post
export const deleteUserAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      await axios.delete('/api/v1/auth/deleteaccount');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(
        setAlert('Your Account Has Been Deleted Permanently.', 'success')
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.error, status: err.response.status },
      });
    }
  }
};
