import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addUserProfileExperience,
  updateUserProfileExperience,
  getCurrentLoggedInUserProfile,
} from '../../actions/profile';

const initialState = {
  company: '',
  title: '',
  location: '',
  from: '',
  to: '',
  current: false,
  description: '',
};

const AddExperience = ({
  profile: { profile, loading },
  addUserProfileExperience,
  updateUserProfileExperience,
  getCurrentLoggedInUserProfile,
  history,
}) => {
  const { experience_id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [toDateDisable, toggleToDateDisable] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentLoggedInUserProfile();
    if (!loading && profile) {
      const profileExperienceData = { ...initialState };
      //Finding right index of experience
      const experienceRightIndexToShow = profile.data.experience
        .map((item) => item._id)
        .indexOf(experience_id);
      for (const key in profile.data.experience[experienceRightIndexToShow]) {
        if (key in profileExperienceData) {
          if (
            key === 'current' &&
            profile.data.experience[experienceRightIndexToShow][key]
          ) {
            toggleToDateDisable(true);
            profileExperienceData[key] =
              profile.data.experience[experienceRightIndexToShow][key];
          } else if (key === 'to' || key === 'from') {
            profileExperienceData[key] = moment(
              profile.data.experience[experienceRightIndexToShow][key]
            ).format('YYYY-MM-DD');
          } else {
            profileExperienceData[key] =
              profile.data.experience[experienceRightIndexToShow][key];
          }
        }
      }
      if (experience_id) {
        setFormData(profileExperienceData);
      }
    }
  }, [profile, loading, getCurrentLoggedInUserProfile, experience_id]);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (experience_id) {
      updateUserProfileExperience(formData, experience_id, history);
    } else {
      addUserProfileExperience(formData, history);
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>
        {experience_id ? 'Update' : 'Add'} An Experience
      </h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i>{' '}
        {experience_id ? 'Update' : 'Add'} developer/programming positions that
        you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
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
            Current Job
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
            placeholder='Job Description'
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  addUserProfileExperience: PropTypes.func.isRequired,
  updateUserProfileExperience: PropTypes.func.isRequired,
  getCurrentLoggedInUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addUserProfileExperience,
  updateUserProfileExperience,
  getCurrentLoggedInUserProfile,
})(withRouter(AddExperience));
