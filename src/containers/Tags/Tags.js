import React, { Component } from "react";

import axios from '../../axios-blog';
import classes from './Tags.module.css';
import Tag from "../../components/Tag/Tag";
import { withRouter } from "react-router-dom";

class Tags extends Component {
    state = {
        tags: []
    }

    componentDidMount() {
        axios.get('/tags')
            .then(response => {
                console.log(response);
                const tags = response.data.tags;
                this.setState({ tags: [...tags], error: false });
            }).catch(error => {
                console.log(error)
            });
    }

    tagSelectedHandler = (tag,index) => {
        this.props.history.push({ pathname: '/articles?tag=' + tag});
    }

    render() {
        let tags = <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Something Went Wrong</p>
        if (!this.state.error) {
            tags = this.state.tags.map((tag,index) => {
                return (
                    <Tag 
                    key = {index}
                    clicked={() => this.tagSelectedHandler(tag,index)}> {tag} </Tag>
                )
            })
        }

        return (
            <div className={classes.Tags}>
                <h3>Popular Tags:-</h3>
                <section>
                    {tags}
                </section>
            </div>
        );
    }
}

export default withRouter(Tags);