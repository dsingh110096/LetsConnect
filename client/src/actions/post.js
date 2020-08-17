import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
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

//Add like to post
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/likes/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: 'Unable to Like', status: 400 },
    });
  }
};

//Remove like from post
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/removelike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: 'Unable to remove like', status: 400 },
    });
  }
};
