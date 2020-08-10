import React, { Component } from 'react';
import axios from '../../axios-blog';

import classes from './FullArticle.module.css';
import { withRouter } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import Comments from '../Comments/Comments';

class FullArticle extends Component {

    state = {
        loadedArticle: null
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if (this.props.match?.params?.slug) {
            if (!this.state.loadedArticle || (this.props.match.params.slug !== this.state.loadedArticle.slug)) {
                axios.get('/articles/' + this.props.match.params.slug)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            loadedArticle: response.data.article
                        });
                    });
            }
        }
    }

    deleteArticleHandler = () => {
        axios.delete('/articles/' + this.props.match.params.slug,
            {
                headers: {
                    'Authorization': `Token ${this.props.token}`
                }
            }
        )
            .then(response => {
                this.props.history.push("/articles");
            });
    }

    editArticleHandler = () => {
        this.props.history.push(`/newArticle/${this.state.loadedArticle.slug}`);
    }

    getEditDeleteButton() {
        if (this.props.isAuthenticated && this.props.username === this.state.loadedArticle?.author?.username) {
            return (<div>
                <Button
                    btnType="Success"
                    clicked={this.editArticleHandler}>EDIT ARTICLE</Button>

                <Button
                    btnType="Danger"
                    clicked={this.deleteArticleHandler}>DELETE ARTICLE</Button>
            </div>)
        }
        else {
            return null;
        }
    }

    render() {
        let showEditDeleteButton = this.getEditDeleteButton();

        let article = <p style={{ textAlign: "center" }}>Loading.....</p>;
        if (this.state.loadedArticle) {
            article = (
                <React.Fragment>
                <div className={classes.FullArticle}>
                    <h1>{this.state.loadedArticle.title}</h1>
                    <p>{this.state.loadedArticle.body}</p>
                    {showEditDeleteButton}
                </div>                
                <Comments slug = {this.state.loadedArticle.slug} />
                </React.Fragment>
            );
        }
        return article;
    }
}

const mapStateTopProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username,
        token: state.auth.token
    }
}

export default connect(mapStateTopProps)(withRouter(FullArticle));