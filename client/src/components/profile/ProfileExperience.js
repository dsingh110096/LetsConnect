import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileExperience = ({
  profile: { profile },
  auth,
  experience: { _id, company, title, location, description, from, to },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      <p>
        {!auth.loading && profile.data.user._id === auth.user.data._id && (
          <Link to={`/edit-user-experience/${_id}`} className='btn btn-success'>
            Update
          </Link>
        )}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  experience: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileExperience);
