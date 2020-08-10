import React from 'react';

import classes from './Comment.module.css';

const Comment = (props) => {
  return (
    <article className={classes.CommentBox}>
      <p className={classes.Comment}>{props.comment}</p>
      <span className={classes.Author}>{props.author}</span>
      {
        props.deletable ?
          <React.Fragment>
            <span onClick={props.onDeleteClick} className={classes.DeleteButton}>DELETE</span>
          </React.Fragment> :
          null
      }
    </article>)
}

export default Comment;