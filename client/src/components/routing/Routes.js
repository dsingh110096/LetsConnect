import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Profiles from '../profiles/Profiles';
import Posts from '../posts/Posts';
import Profile from '../profile/Profile';
import CreateAndUpdateProfile from '../profile-forms/CreateAndUpdateProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/user/:user_id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/create-profile'
          component={CreateAndUpdateProfile}
        />
        <PrivateRoute
          exact
          path='/edit-profile'
          component={CreateAndUpdateProfile}
        />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute
          exact
          path='/edit-user-experience/:experience_id'
          component={AddExperience}
        />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute
          exact
          path='/edit-user-education/:education_id'
          component={AddEducation}
        />
        <PrivateRoute exact path='/posts' component={Posts} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
