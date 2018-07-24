import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input(props) {
  const { id, label, type, value, onChangeCallback } = props;

  return (
    <div>
      <label className='Label' htmlFor={id}>{label}</label>
      <input id={id} className='Input' type={type} value={value} onChange={onChangeCallback} />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'date']).isRequired,
  value: PropTypes.string,
  onChangeCallback: PropTypes.func.isRequired,
};

export default Input;