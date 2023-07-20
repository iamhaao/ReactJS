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
import Counter from './CounterRedux';
import { COMMENTS } from '../shared/comment';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leaders';
import { DISHES } from '../shared/dished';
import ControlledForm from './FormControllerComponent';
import CounterRedux from './CounterRedux';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos, postComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),

});


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }


    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }
        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };
        return (
            <div>
                <Header />
                <div>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch location={this.props.location}>
                                <Route path='/home' component={HomePage} />
                                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                                <Route path='/menu/:dishId' component={DishWithId} />
                                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>

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
