import React from 'react';

import styles from './Tag.module.css';

const TagComponent = (props) => {
  return (
  <span onClick = {props.clicked} className={[styles.Tag, styles.Selected].join(' ')}>{props.children}</span>)
}

export default TagComponent;