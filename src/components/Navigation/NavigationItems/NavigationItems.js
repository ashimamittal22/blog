import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/articles' exact> Home </NavigationItem>
      {
        props.isAuthenticated ?
          <React.Fragment>
            <NavigationItem link='/newArticle'>New Article</NavigationItem>
            <NavigationItem link='/logout'>Logout</NavigationItem>
          </React.Fragment>
          :
          <NavigationItem link='/authenticate'>Authenticate</NavigationItem>
      }
    </ul>
  );
}

export default NavigationItems