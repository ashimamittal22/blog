import React, { Component } from "react";

import Article from '../../components/Article/Article';
import axios from '../../axios-blog';
import classes from './Articles.module.css';
import { withRouter } from "react-router-dom";

class Articles extends Component {
    state = {
        articles: [],
        page: 0
    }

    loadArticles(url){
        axios.get(url)
        .then(response => {
            console.log(response);
            const articles = response.data.articles;
            const updatedArticles = articles.map(article => {
                return {
                    ...article
                }
            });
            this.setState({ articles: updatedArticles, error: false });
        }).catch(error => {
            console.log(error)
        });
    }

    componentDidMount() {
        this.loadArticles('/articles?limit=20');
    }

    // componentDidUpdate(){
    //     //check for the tag property and hit for particular tag
    //     console.log(this.props);
    // }

    articleSelectedHandler = (slug) => {
        this.props.history.push({ pathname: '/articles/' + slug });
    }

    render() {
        let articles = <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Something Went Wrong</p>
        if (!this.state.error) {
            articles = this.state.articles.map(article => {
                return (
                    <Article
                        key={article.slug}
                        title={article.title}
                        author={article.author.username}
                        clicked={() => this.articleSelectedHandler(article.slug)} />
                )
            })
        }

        return (
            <div>
                <section className={classes.Articles}>
                    {articles}
                </section>
            </div>
        );
    }
}

export default withRouter(Articles);