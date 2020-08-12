import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

//Get Current logged in user profile
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

    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.error, status: err.response.status },
    });
  }
};
