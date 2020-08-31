import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addUserProfileEducation,
  getCurrentLoggedInUserProfile,
  updateUserProfileEducation,
} from '../../actions/profile';

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  to: '',
  current: false,
  description: '',
};

const AddEducation = ({
  profile: { profile, loading },
  addUserProfileEducation,
  getCurrentLoggedInUserProfile,
  updateUserProfileEducation,
  history,
}) => {
  const { education_id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [toDateDisable, toggleToDateDisable] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentLoggedInUserProfile();
    if (!loading && profile) {
      const profileEducationData = { ...initialState };
      //Finding right index of education
      const educationRightIndexToShow = profile.education
        .map((item) => item._id)
        .indexOf(education_id);
      for (const key in profile.education[educationRightIndexToShow]) {
        if (key in profileEducationData) {
          if (
            key === 'current' &&
            profile.education[educationRightIndexToShow][key]
          ) {
            toggleToDateDisable(true);
            profileEducationData[key] =
              profile.education[educationRightIndexToShow][key];
          } else if (key === 'to' || key === 'from') {
            profileEducationData[key] = moment(
              profile.education[educationRightIndexToShow][key]
            ).format('YYYY-MM-DD');
          } else {
            profileEducationData[key] =
              profile.education[educationRightIndexToShow][key];
          }
        }
      }
      if (education_id) {
        setFormData(profileEducationData);
      }
    }
  }, [profile, loading, getCurrentLoggedInUserProfile, education_id]);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (education_id) {
      updateUserProfileEducation(formData, education_id, history);
    } else {
      addUserProfileEducation(formData, history);
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>
        {education_id ? 'Update' : 'Add'} An Education
      </h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i>{' '}
        {education_id ? 'Update' : 'Add'} school, bootcamp, etc that you have
        attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={onChange} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              id='checked'
              name='current'
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                const checkbox = document.querySelector('#checked');
                if (checkbox.checked) {
                  toggleToDateDisable(!toDateDisable);
                  setFormData({ ...formData, current: !current, to: null });
                } else if (!checkbox.checked) {
                  toggleToDateDisable(false);
                }
              }}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to ? to : ''}
            onChange={onChange}
            disabled={toDateDisable ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
            placeholder='Program Description'
            name='description'
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  addUserProfileEducation: PropTypes.func.isRequired,
  getCurrentLoggedInUserProfile: PropTypes.func.isRequired,
  updateUserProfileEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addUserProfileEducation,
  getCurrentLoggedInUserProfile,
  updateUserProfileEducation,
})(withRouter(AddEducation));
