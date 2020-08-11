import React, { Component } from "react";
import axios from '../../axios-blog';
import Article from '../../components/Article/Article';
import { withRouter } from "react-router-dom";
import styles from './Articles.module.css';


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
                <section className={styles.Articles}>
                    {articles}
                </section>
            </div>
        );
    }
}

export default withRouter(Articles);