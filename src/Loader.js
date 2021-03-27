import React from 'react';

const Loader = () => {
  return (
    <div className='group'>
      <div className='bigSqr'>
        <div className='square first'></div>
        <div className='square second'></div>
        <div className='square third'></div>
        <div className='square fourth'></div>
      </div>
      <div className='text'>loading</div>
    </div>
  );
};

export default Loader;
