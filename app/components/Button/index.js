import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
  const { title, onClickCallback } = props;

  return (
    <button className='Button' onClick={onClickCallback}>{title}</button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default Button;