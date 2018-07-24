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
import { openForm, closeForm } from './actions';
import reducer from './reducer';
import Form from '../../components/Form/';
import Input from '../../components/Input/';
import Button from '../../components/Button/';
import './HomePage.css';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  state = {
    newClassFields: {
      classId: '',
      className: '',
      classNumber: '',
      classStart: '',
    },
  };

  onClickNewClassCancel = () => {
    const newClassFields = { ...this.state.newClassFields };

    Object.keys(newClassFields).map(property => {
      newClassFields[property] = '';
      return property;
    });

    this.setState({ newClassFields });

    this.props.closeForm();
  };

  onChangeNewClassFields = (event, property) => {
    const newClassFields = { ...this.state.newClassFields };
    newClassFields[property] = event.target.value;

    this.setState({ newClassFields });
  };

  onClickNewStudentCancel = () => {
    this.props.closeForm();
  };

  saveClass = () => {
    console.log('classId:', this.state.newClassFields.classId);
    console.log('className:', this.state.newClassFields.className);
    console.log('classNumber:', this.state.newClassFields.classNumber);
    console.log('classStart:', this.state.newClassFields.classStart);
  };

  render() {
    const { activeFormId, openNewClassForm, openNewStudentForm } = this.props;

    return (
      <div className='HomePage'>
        <h1 className='H1'>Classes</h1>
        {activeFormId === 'newClass' &&
          <Form>
            <h2 className='H2'>New Class</h2>

            <Input id='classId' label='Class ID:' type='text' value={this.state.newClassFields.classId} onChangeCallback={event => this.onChangeNewClassFields(event, 'classId')} />
            <Input id='className' label='Class Name:' type='text' value={this.state.newClassFields.className} onChangeCallback={event => this.onChangeNewClassFields(event, 'className')} />
            <Input id='classNumber' label='Maximum number of students:' type='number' value={this.state.newClassFields.classNumber} onChangeCallback={event => this.onChangeNewClassFields(event, 'classNumber')} />
            <Input id='classStart' label='Starting Date:' type='date' value={this.state.newClassFields.classStart} onChangeCallback={event => this.onChangeNewClassFields(event, 'classStart')} />

            <Button title='Save' onClickCallback={this.saveClass} /> <Button title='Cancel' onClickCallback={this.onClickNewClassCancel} />
          </Form>
        }
        {activeFormId === 'newStudent' &&
          <Form>
            <h2 className='H2'>New Student</h2>
            <Button title='Cancel' onClickCallback={this.onClickNewStudentCancel} />
          </Form>
        }
        <Button title='New Class' onClickCallback={openNewClassForm} /> <Button title='New Student' onClickCallback={openNewStudentForm} />
      </div>
    );
  }
}

HomePage.propTypes = {
  activeFormId: PropTypes.string,
  openNewClassForm: PropTypes.func,
  openNewStudentForm: PropTypes.func,
  closeForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activeFormId: makeSelectActiveFormId(),
});

const mapDispatchToProps = dispatch => {
  return {
    openNewClassForm: () => { dispatch(openForm('newClass')) },
    openNewStudentForm: () => { dispatch(openForm('newStudent')) },
    closeForm: () => { dispatch(closeForm()) },
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