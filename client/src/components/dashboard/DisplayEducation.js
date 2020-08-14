import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteUserProfileEducation } from '../../actions/profile';

const DisplayEducation = ({ education, deleteUserProfileEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteUserProfileEducation(edu._id)}
        >
          Delete
        </button>
      </td>
      <td>
        <Link
          to={`/edit-user-education/${edu._id}`}
          className='btn btn-success'
        >
          Update
        </Link>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Delete Edu</th>
            <th>Update Edu</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

DisplayEducation.propTypes = {
  education: PropTypes.array.isRequired,
  deleteUserProfileEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteUserProfileEducation })(DisplayEducation);
