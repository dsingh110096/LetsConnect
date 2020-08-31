import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCurrentLoggedInUserProfile,
  deleteUserAccount,
} from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DisplayExperience from './DisplayExperience';
import DisplayEducation from './DisplayEducation';

const Dashboard = ({
  getCurrentLoggedInUserProfile,
  deleteUserAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentLoggedInUserProfile();
    //eslint-disable-next-line
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.data.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.experience.length === 0 &&
            profile.education.length === 0 && (
              <p className='lead my-2'>
                Add Experience or Education to make your profile stand out
                across other developers
              </p>
            )}
          {profile.experience.length > 0 && (
            <DisplayExperience experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <DisplayEducation education={profile.education} />
          )}

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteUserAccount()}
            >
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup your profile, please add info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentLoggedInUserProfile: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  deleteUserAccount,
  getCurrentLoggedInUserProfile,
})(Dashboard);
