import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclaimation-triagle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page doest not exist</p>
    </Fragment>
  );
};

export default NotFound;
