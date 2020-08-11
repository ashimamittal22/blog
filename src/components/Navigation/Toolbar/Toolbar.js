import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const ToolbarComponent = (props) => {
  return (
    <header className = {styles.Toolbar}>
      <div className = {styles.Logo}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems isAuthenticated = {props.isAuthenticated} />
      </nav>
    </header>
  );
}

export default ToolbarComponent;