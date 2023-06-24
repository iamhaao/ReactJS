import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Media
} from 'reactstrap';


function RenderMovie({ movie, onClick }) {
    return (
        <Link to={`/movies/${movie.id}`} >
            <Card>
                <Media>
                    <Media left className='col-sm-5'>
                        <Media object src={movie.img} alt={movie.title} />
                    </Media>
                    <Media body className='col-sm-7'>
                        <Media heading>{movie.title}</Media>
                        <p>{movie.director}</p>
                        <p>{movie.genre}</p>
                    </Media>
                </Media>
            </Card>
        </Link>
    );
}

function Home1(props) {


    const listmovies = props.movies.map((movie) => {
        return (
            <div className=" col-md-auto m-1" key={movie.id}>
                <RenderMovie movie={movie} onClick={props.onClick} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row align-items-start">
                <Media list>
                    {listmovies}
                </Media>
            </div>
        </div>
    );
}
export default Home1;