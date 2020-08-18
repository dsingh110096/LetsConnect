import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  CLEAR_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import axios from 'axios';
import { setAlert } from '../actions/alert';

//Get All Post
export const getAllPost = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST });
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

//Delete user post
export const deleteUserPost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add user post
export const addUserPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Post by post id
export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add comment to post
export const addCommentToPost = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `/api/v1/posts/comments/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove comment to post
export const removeCommentFromPost = (postId, commentId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/v1/posts/removecomment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
