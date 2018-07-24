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
import formatAussieDate from 'utils/formatDate';
import injectReducer from 'utils/injectReducer';
import { makeSelectActiveFormId, makeSelectNewClassFields, makeSelectNewStudentClassFields, makeSelectClasses, makeSelectStudents } from 'containers/App/selectors';
import { openForm, closeForm, addClass, updateNewClassFields, resetNewClassFields, deleteClass, updateNewStudentClassFields, resetNewStudentClassFields, addStudentClass } from './actions';
import reducer from './reducer';
import Form from '../../components/Form/';
import Input from '../../components/Input/';
import Select from '../../components/Select/';
import Button from '../../components/Button/';
import TableAction from '../../components/TableAction';
import './HomePage.css';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  onClickNewClassSave = () => {
    const { newClassFields } = this.props;

    // simple validation check to ensure all fields have been entered before saving
    if(newClassFields.classId !== '' && newClassFields.className !== '' && newClassFields.classNumber !== '' && newClassFields.classStart !== '') {
      this.props.addClassByObj();
      this.props.resetNewClassFields();
      this.props.closeForm();
    }
  };

  onClickNewClassCancel = () => {
    this.props.resetNewClassFields();
    this.props.closeForm();
  };

  onChangeNewClassFields = (event, property) => {
    this.props.updateNewClassFields(property, event.target.value);
  };

  onChangeNewStudentClassFields = (event, property) => {
    this.props.updateNewStudentClassFields(property, event.target.value);
  };

  onClickNewStudentSave = () => {
    const { NewStudentClassFields } = this.props;

    // simple validation check to ensure all fields have been entered before saving
    if(NewStudentClassFields.studentId !== '' && NewStudentClassFields.classId !== '') {
      this.props.addStudentClass();
      this.props.resetNewStudentClassFields();
      this.props.closeForm();
    }
  };

  onClickNewStudentCancel = () => {
    this.props.resetNewStudentClassFields();
    this.props.closeForm();
  };

  render() {
    const { activeFormId, newClassFields, classes, students, openNewClassForm, openNewStudentForm, deleteClassById } = this.props;

    // students options for select component
    const studentsOptions = students.map(student => {
      return {
        label: `${student.id}: ${student.name}`,
        value: student.id,
      };
    });

    // classes options for select component
    const classesOptions = classes.map(classSingle => {
      return {
        label: `${classSingle.classId}: ${classSingle.className}`,
        value: classSingle.classId,
      };
    });

    return (
      <div className='HomePage'>
        <h1 className='H1'>Classes</h1>

        <table className='Table'>
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
              <th>Starting Date</th>
              <th># of Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classSingle) => {
              return (<tr key={classSingle.classId}>
                <td>{classSingle.classId}</td>
                <td>{classSingle.className}</td>
                <td>{formatAussieDate(classSingle.classStart)}</td>
                <td>{classSingle.classStudents.length}</td>
                <td><TableAction label='View' type='view' onClickCallback={()=> console.log('view clicked')} /> / <TableAction label='Delete' type='delete' onClickCallback={() => deleteClassById(classSingle.classId)} /></td>
              </tr>);
            })}
          </tbody>
        </table>

        {activeFormId === 'newClass' &&
          <Form>
            <h2 className='H2'>Add New Class</h2>

            <Input id='newClassId' label='Class ID:' type='text' value={newClassFields.classId} onChangeCallback={event => this.onChangeNewClassFields(event, 'classId')} />
            <Input id='newClassName' label='Class Name:' type='text' value={newClassFields.className} onChangeCallback={event => this.onChangeNewClassFields(event, 'className')} />
            <Input id='newClassNumber' label='Maximum number of students:' type='number' value={newClassFields.classNumber} onChangeCallback={event => this.onChangeNewClassFields(event, 'classNumber')} />
            <Input id='newClassStart' label='Starting Date:' type='date' value={newClassFields.classStart} onChangeCallback={event => this.onChangeNewClassFields(event, 'classStart')} />

            <Button title='Save' onClickCallback={this.onClickNewClassSave} /> <Button title='Cancel' onClickCallback={this.onClickNewClassCancel} />
          </Form>
        }
        {activeFormId === 'newStudent' &&
          <Form>
            <h2 className='H2'>Add Student to Class</h2>

            <Select id='studentId' label='Student' firstOptionText='Select a Student' options={studentsOptions} onChangeCallback={event => this.onChangeNewStudentClassFields(event, 'studentId')} />
            <Select id='classId' label='Class' firstOptionText='Select a Class' options={classesOptions} onChangeCallback={event => this.onChangeNewStudentClassFields(event, 'classId')} />

            <Button title='Save' onClickCallback={this.onClickNewStudentSave} /> <Button title='Cancel' onClickCallback={this.onClickNewStudentCancel} />
          </Form>
        }

        <Button title='Add New Class' onClickCallback={openNewClassForm} /> <Button title='Add Student to Class' onClickCallback={openNewStudentForm} />
      </div>
    );
  }
}

HomePage.propTypes = {
  activeFormId: PropTypes.string,
  newClassFields: PropTypes.object,
  NewStudentClassFields: PropTypes.object,
  classes: PropTypes.array,
  students: PropTypes.array,
  openNewClassForm: PropTypes.func,
  openNewStudentForm: PropTypes.func,
  closeForm: PropTypes.func,
  addClassByObj: PropTypes.func,
  updateNewClassFields: PropTypes.func,
  resetNewClassFields: PropTypes.func,
  deleteClassById: PropTypes.func,
  updateNewStudentClassFields: PropTypes.func,
  resetNewStudentClassFields: PropTypes.func,
  addStudentClass: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activeFormId: makeSelectActiveFormId(),
  newClassFields: makeSelectNewClassFields(),
  NewStudentClassFields: makeSelectNewStudentClassFields(),
  classes: makeSelectClasses(),
  students: makeSelectStudents(),
});

const mapDispatchToProps = dispatch => {
  return {
    openNewClassForm: () => dispatch(openForm('newClass')),
    openNewStudentForm: () => dispatch(openForm('newStudent')),
    closeForm: () => dispatch(closeForm()),
    addClassByObj: () => dispatch(addClass()),
    updateNewClassFields: (property, value) => dispatch(updateNewClassFields(property, value)),
    resetNewClassFields: () => dispatch(resetNewClassFields()),
    deleteClassById: classId => dispatch(deleteClass(classId)),
    updateNewStudentClassFields: (property, value) => dispatch(updateNewStudentClassFields(property, value)),
    resetNewStudentClassFields: () => dispatch(resetNewStudentClassFields()),
    addStudentClass: () => dispatch(addStudentClass()),
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