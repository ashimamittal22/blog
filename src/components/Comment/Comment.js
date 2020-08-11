import React from 'react';

import styles from './Comment.module.css';

const CommentComponent = (props) => {
  return (
    <article className={styles.CommentBox}>
      <p className={styles.Comment}>{props.comment}</p>
      <span className={styles.Author}>{props.author}</span>
      {
        props.deletable ?
          <React.Fragment>
            <span onClick={props.onDeleteClick} className={styles.DeleteButton}>DELETE</span>
          </React.Fragment> :
          null
      }
    </article>)
}

export default CommentComponent;