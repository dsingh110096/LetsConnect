import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFound from '../layout/NotFound';
import ProfileTop from './ProfileTop.js';
import { Link } from 'react-router-dom';
import { getProfileByUserId } from '../../actions/profile';

const Profile = ({
  profile: { profile, loading },
  auth,
  match,
  getProfileByUserId,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.user_id);
  }, [getProfileByUserId, match.params.user_id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <NotFound />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.data._id === profile.data.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
