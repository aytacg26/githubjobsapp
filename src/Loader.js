import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className='loader-spinner-area'>
      <Spinner animation='border' role='status' variant='primary'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
