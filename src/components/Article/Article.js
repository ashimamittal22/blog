import React from 'react';

import classes from './Article.module.css';

const Article = (props) => (
    <article className={classes.Article} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Author}>{props.author}</div>
    </article>
);

export default Article;