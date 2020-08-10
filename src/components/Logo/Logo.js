import React from 'react';
import blogLogo from '../../assets/Logo/blog.png';
import classes from './Logo.module.css';

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={blogLogo} alt='Blog' />
  </div>
);

export default Logo;