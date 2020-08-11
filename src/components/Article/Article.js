import React from 'react';

import styles from './Article.module.css';

const ArticleComponent = (props) => (
    <article className={styles.Article} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={styles.Author}>{props.author}</div>
    </article>
);

export default ArticleComponent;