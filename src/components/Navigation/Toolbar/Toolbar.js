import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {
  return (
    <header className = {classes.Toolbar}>
      <div className = {classes.Logo}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems isAuthenticated = {props.isAuthenticated} />
      </nav>
    </header>
  );
}

export default Toolbar;