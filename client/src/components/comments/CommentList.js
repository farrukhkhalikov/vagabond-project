import React, { Component } from 'react';
import axios from 'axios'
import NewCommentForm from './NewCommentForm'

class CommentList extends Component {
    state = {
        comments: [],
        newComment: {
            title: '',
            content: ''
        }
    }
    createComment = async event => {
        event.preventDefault()
        const response = await axios.post(`/api/cities/${this.props.cityId}/comments`, this.state.newComment)
        this.props.getSingleCity()
    }
    handleChange = event => {
        const newComment = { ...this.state.newComment }
        newComment[event.target.name] = event.target.value
        this.setState({ newComment })
        console.log(this.state.newComment)
    }
    toggleCommentForm = () => {
        this.setState({ showCreateCommentForm: !this.state.showCreateCommentForm });
    };
    render() {
        return (
            <div>
                {this.props.comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <h3>{comment.title}</h3>
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
                <button negative onClick={this.toggleCommentForm}>
                    New Comment
                        </button>
                {this.state.showCreateCommentForm ? <NewCommentForm handleChange={this.handleChange} createComment={this.createComment} newComment={this.state.newComment} /> : null}
            </div>
        );
    }
}

export default CommentList;
