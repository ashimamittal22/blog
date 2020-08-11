import React from 'react';
import blogLogo from '../../assets/Logo/blog.png';
import styles from './Logo.module.css';

const LogoComponent = (props) => (
  <div className={styles.Logo}>
    <img src={blogLogo} alt='Blog' />
  </div>
);

export default LogoComponent;