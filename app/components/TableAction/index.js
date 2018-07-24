import React from 'react';
import PropTypes from 'prop-types';
import './TableAction.css';

function TableAction(props) {
  const { label, type, onClickCallback } = props;

  const onClick = () => {
    if(type === 'view') {
      onClickCallback();
    }
    else if(type === 'delete') {
      if(window.confirm('Are you sure you wish to delete this class?')) {
        onClickCallback();
      }
    }
  };

  return (
    <button className='TableAction' onClick={onClick}>{label}</button>
  );
}

TableAction.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['view', 'delete']).isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default TableAction;