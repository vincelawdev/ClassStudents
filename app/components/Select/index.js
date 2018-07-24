import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

function Select(props) {
  const { id, label, firstOptionText, options, onChangeCallback } = props;

  return (
    <div>
      <label className='SelectLabel' htmlFor={id}>{label}</label>
      <select id={id} className='Select' onChange={onChangeCallback}>
        <option value="">{firstOptionText}</option>
        {options.map((option, index) => {
          return (<option key={index} value={option.value}>{option.label}</option>);
        })}
      </select>
    </div>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  firstOptionText: PropTypes.string,
  //options: PropTypes.array.isRequired,
  onChangeCallback: PropTypes.func.isRequired,
};

Select.defaultProps = {
  firstOptionText: 'Select an option',
};

export default Select;