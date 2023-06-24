import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay
} from 'reactstrap';
import { Link } from 'react-router-dom';
class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMoviedetail: this.props.movie
        }
    }
    renderMovie(movie) {
        if (movie != null)
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={movie.img} alt={movie.title} />
                        <CardBody>
                            <CardTitle> {movie.title}</CardTitle>
                            <CardText> {movie.genre} </CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        else {
            return (
                <div></div>
            )
        }
    }



    render() {
        const movie = this.props.movie;

        if (movie == null) {
            return (<div></div>);
        }
        const movieItem = this.renderMovie(movie);
        return (
            <div className='col-12 col-md-5 m-1'>
                {movieItem}
            </div>
        )
    }

}



export default MovieDetail;