/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { makeSelectActiveFormId } from 'containers/App/selectors';
import { openForm } from './actions';
import reducer from './reducer';
import Form from '../../components/Form/';
import Button from '../../components/Button/';
import './HomePage.css';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  render() {
    const { activeFormId, onClickNewClass, onClickNewStudent } = this.props;

    return (
      <div className='HomePage'>
        <h1 className='H1'>Classes</h1>
        <Form>Testing form</Form>
        <Button title='New Class' onClickCallback={onClickNewClass} /> <Button title='New Student' onClickCallback={onClickNewStudent} />
      </div>
    );
  }
}

HomePage.propTypes = {
  activeFormId: PropTypes.string,
  onClickNewClass: PropTypes.func,
  onClickNewStudent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activeFormId: makeSelectActiveFormId(),
});

const mapDispatchToProps = dispatch => {
  return {
    onClickNewClass: () => { dispatch(openForm('newClass')) },
    onClickNewStudent: () => { dispatch(openForm('newStudent')) },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);