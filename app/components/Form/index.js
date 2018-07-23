import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

function Form(props) {
  return (
    <div className='Form'>{props.children}</div>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;