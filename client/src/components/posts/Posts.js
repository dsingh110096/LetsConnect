import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPost } from '../../actions/post';

const Posts = ({ post: { posts, loading }, getAllPost }) => {
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);
  return <div></div>;
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPost })(Posts);
