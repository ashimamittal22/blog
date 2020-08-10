import React from 'react';

import classes from './Tag.module.css';

const Tag = (props) => {
  return (
  <span onClick = {props.clicked} className={[classes.Tag, classes.Selected].join(' ')}>{props.children}</span>)
}

export default Tag;