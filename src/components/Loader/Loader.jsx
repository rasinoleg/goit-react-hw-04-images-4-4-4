import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={css.Spinner}>
      <ThreeDots
        height={80}
        width={80}
        radius={9}
        color="#000000"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
