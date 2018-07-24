import React from 'react';
import PropTypes from 'prop-types';
import './TableAction.css';

function TableAction(props) {
  const { label, type, item, onClickCallback } = props;

  const onClick = () => {
    if(type === 'view') {
      onClickCallback();
    }
    else if(type === 'delete') {
      if(window.confirm(`Are you sure you wish to delete this ${item}?`)) {
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
  item: PropTypes.string,
  onClickCallback: PropTypes.func.isRequired,
};

TableAction.defaultProps = {
  item: 'item',
};

export default TableAction;