import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentLoggedInUserProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentLoggedInUserProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentLoggedInUserProfile();
  }, [getCurrentLoggedInUserProfile]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentLoggedInUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentLoggedInUserProfile })(
  Dashboard
);
