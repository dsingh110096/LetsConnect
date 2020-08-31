import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileEducation = ({
  profile: { profile },
  auth,
  education: { _id, school, degree, fieldofstudy, description, from, to },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      {profile === null || auth.user === null
        ? ''
        : !auth.loading &&
          profile.user._id === auth.user.data._id && (
            <Link
              to={`/edit-user-education/${_id}`}
              className='btn btn-success'
            >
              Update
            </Link>
          )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  education: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileEducation);
