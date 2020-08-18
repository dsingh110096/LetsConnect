import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deleteUserPost } from '../../actions/post';
const PostItem = ({
  addLike,
  removeLike,
  deleteUserPost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, createdAt },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted On: <Moment format='YYYY/MM/DD'>{createdAt}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type='button'
              onClick={(e) => addLike(_id)}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>
              <span> {likes.length}</span>
            </button>
            <button
              type='button'
              onClick={(e) => removeLike(_id)}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Comments{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user.data._id && (
              <button
                type='button'
                onClick={(e) => deleteUserPost(_id)}
                className='btn btn-danger'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteUserPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deleteUserPost,
})(PostItem);
