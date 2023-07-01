import React, { Component } from "react";
import { Card, CardTitle, CardImg, CardImgOverlay, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay >
                    <CardTitle>{dish.name}</CardTitle>
                    <CardBody>{dish.description}</CardBody>
                </CardImgOverlay>
            </Card>
        )
    else {
        return (
            <div></div>
        )
    }
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        const comment = comments.map((comment) => {
            return (
                <div className="container">
                    <div key={comment.id}>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author},
                                &nbsp;
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit'
                                }).format(new Date(comment.date))}
                            </p>
                        </li>
                    </div>
                </div>
            );

        });
        return (

            <div>
                <h4> Comments </h4>
                <ul>
                    {comment}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>

        )
    }

    else {
        return (
            <div><CommentForm dishId={dishId} addComment={addComment} /></div>
        )
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    //console.log(dish);

    if (dish == null) {
        return (<div></div>);
    }

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
                    addComment={props.addComment}
                    dishId={props.dish.id}
                />


            </div>
        </div>
    )
}



export default DishDetail