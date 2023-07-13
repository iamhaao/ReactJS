import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    // Other component methods
    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    };
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    };


    render() {
        return (
            <div>
                {/* Toggle Button */}
                <Button onClick={this.toggleModal}>Submit Comment</Button>

                {/* Modal */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div>
                            <LocalForm model="comment" onSubmit={(values) => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <label htmlFor="author">Your Name</label>
                                    <Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(20)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment</label>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                        rows={6}
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(100)
                                        }}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit Comment
                                </button>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default CommentForm;