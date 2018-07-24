import React from 'react';
import PropTypes from 'prop-types';
import './TableAction.css';

function TableAction(props) {
  const { label, type, onClickCallback } = props;

  const onClick = () => {
    onClickCallback();
  };

  return (
    <button className='TableAction' onClick={onClick}>{label}</button>
  );
}

TableAction.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default TableAction;