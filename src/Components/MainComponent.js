import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home1 from './HomePage1Componen';
import Counter from './CounterRedux';
import { COMMENTS } from '../shared/comment';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leaders';
import { DISHES } from '../shared/dished';
import ControlledForm from './FormControllerComponent';
import MovieDetail from './MovieDetailComponent';
import CounterRedux from './CounterRedux';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const Movies = require('../shared/movie.json');

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) }
});


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            movies: Movies
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }


    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
                />
            );
        };

        const HomePage1 = () => {
            return (
                <Home1 movies={this.state.movies} />
            );

        }



        const MovieWithId = ({ match }) => {
            return (
                <MovieDetail movie={this.state.movies.filter((movie) => movie.id === parseInt(match.params.movieId, 10))[0]} />
            )
        }



        return (
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                        <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/contactus' component={Contact} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
        // <div>
        //     <Header />
        //     <Provider store={store}>
        //         <CounterRedux />
        //     </Provider>
        //     <Switch>
        //         <Route path='/home' component={HomePage1} />
        //         <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
        //         <Route exact path='/contactus' component={Contact} />
        //         <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
        //         <Route path='/movies/:movieId' component={MovieWithId} />
        //         {/* <Route path='/menu/:dishId' component={DishWithId} /> */}
        //         <Redirect to="/home" />
        //     </Switch>
        //     <Footer />
        //     {/* <ControlledForm /> */}

        // </div>
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
