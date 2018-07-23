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
import Button from '../../components/Button/';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  newClassOnClick = () => {
    console.log('clicked!');
  };

  render() {
    return (
      <div>
        <h1>Classes</h1>
        <Button title={'New Class'} onClickCallback={this.newClassOnClick} />
      </div>
    );
  }
}

export default HomePage;