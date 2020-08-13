import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  deleteUserProfileExperience,
  updateUserProfileExperience,
} from '../../actions/profile';

const DisplayExperience = ({
  experience,
  deleteUserProfileExperience,
  updateUserProfileExperience,
}) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteUserProfileExperience(exp._id)}
        >
          Delete
        </button>
      </td>
      <td>
        <Link
          to='/edit-user-experience'
          className='btn btn-success'
          onClick={() => updateUserProfileExperience(exp._id)}
        >
          Update
        </Link>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Delete Exp</th>
            <th>Update Exp</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

DisplayExperience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteUserProfileExperience: PropTypes.func.isRequired,
  updateUserProfileExperience: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteUserProfileExperience,
  updateUserProfileExperience,
})(DisplayExperience);
