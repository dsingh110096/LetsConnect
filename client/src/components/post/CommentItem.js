import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { removeCommentFromPost } from '../../actions/post';

const CommentItem = ({
  removeCommentFromPost,
  auth,
  postId,
  comment: { _id, text, name, avatar, user, createdAt },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className='round-img' src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{createdAt}</Moment>{' '}
        </p>
        {!auth.loading && user === auth.user.data._id && (
          <button
            onClick={(e) => removeCommentFromPost(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  removeCommentFromPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeCommentFromPost })(CommentItem);
