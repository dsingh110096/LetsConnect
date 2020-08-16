import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem.js';
import { getAllPost } from '../../actions/post';

const Posts = ({ post: { posts, loading }, getAllPost }) => {
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      {/* Post Form Area */}
      <div className='posts'>
        {posts.count > 0 ? (
          posts.data.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <h4>No Posts Found...</h4>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPost })(Posts);
