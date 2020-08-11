import React, { Component } from "react";

import Comment from '../../components/Comment/Comment';
import axios from '../../axios-blog';
import { connect } from "react-redux";
import styles from './Comments.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { updateObject } from "../../shared/utility";

class Comments extends Component {
  state = {
    comments: [],
    comment: {
      elementType: 'textarea',
      elementConfig: {
        required: true,
        rows: '3',
        placeholder: "Write a comment here..."
      },
      value: '',
    }
  }

  loadComments() {
    axios.get(`/articles/${this.props.slug}/comments`)
      .then(response => {
        console.log(response);
        const comments = response.data.comments;
        const updatedComments = comments.map(comment => {
          return {
            ...comment
          }
        });
        this.setState({ comments: updatedComments, error: false });
      }).catch(error => {
        this.setState({ error: error });
      });
  }

  componentDidMount() {
    this.loadComments();
  }

  onDeleteHandler = (commentID) => {
    let header = {
      headers: {
        'Authorization': `Token ${this.props.token}`
      }
    };
    axios.delete(`/articles/${this.props.slug}/comments/${commentID}`, header)
      .then(res => {
        this.loadComments();
      });
  }

  postCommentHandler = (event) => {
    event.preventDefault();
    let header = {
      headers: {
        'Authorization': `Token ${this.props.token}`
      }
    };

    let comment = {
      "comment": {
        "body": this.state.comment.value
      }
    }
    axios.post(`/articles/${this.props.slug}/comments`, comment, header)
      .then(res => {
        this.setState({
          comment: {
            ...this.state.comment,
            value: ''
          }
        })
        this.loadComments();
      })
  }

  inputChangedHandler(e) {
    const updatedComment = updateObject(this.state.comment, {
      value: e.target.value
    });
    this.setState({ comment: updatedComment });
  }

  render() {
    let comments = null;
    if (!this.state.error) {
      comments = this.state.comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            comment={comment.body}
            author={comment.author.username}
            deletable={comment.author.username === this.props.username}
            onDeleteClick={() => (this.onDeleteHandler(comment.id))}
            onEditClick={() => (this.onDeleteHandler(comment.id))}
          />
        )
      })
    }

    let addComment = <h3 className={styles.AddComment}> Please login to post a comment</h3>;
    if (this.props.isAuthenticated) {
      addComment = (<div className={styles.AddComment}>
        <form onSubmit={this.postCommentHandler}>
          <Input
            elementType={this.state.comment.elementType}
            elementConfig={this.state.comment.elementConfig}
            value={this.state.comment.value}
            changed={(event) => this.inputChangedHandler(event)}
          />
          <Button btnType="Success">Post Comment</Button>
        </form>
      </div>);
    }

    return (
      <React.Fragment>
        {addComment}
        <div>
          <section className={styles.Comments}>
            Comments:-
                    {comments}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Comments);