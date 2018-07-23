import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
  return (
    <button className='Button' onClick={props.onClickCallback}>{props.title}</button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default Button;