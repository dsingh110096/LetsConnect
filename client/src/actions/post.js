import { GET_POSTS, POST_ERROR } from './types';
import axios from 'axios';

//Get All Post
export const getAllPost = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
