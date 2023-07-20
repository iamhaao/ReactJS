import React, { Component } from "react";
import { Card, CardTitle, CardImg, CardImgOverlay, CardBody, Breadcrumb, BreadcrumbItem, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>

        )
    else {
        return (
            <div></div>
        )
    }
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const comment = comments.map(comment => {
            return (
                <Fade in>
                    <li key={comment.id} >
                        {comment.comment}
                        <br /><br />
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                        <br /><br />
                    </li>
                </Fade>
            );
        });
        return (

            <div>
                <h4> Comments </h4>
                <ul>
                    {comment}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>

        )
    }

    else {
        return (
            <div><CommentForm dishId={dishId} postComment={postComment} /></div>
        )
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />


                </div>
            </div>
        )
    }
}



export default DishDetail