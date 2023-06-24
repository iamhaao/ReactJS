import React, { Component } from "react";
import { connect } from "react-redux";
class Counter extends React.Component {
    handleIncrement = () => {
        this.props.dispatch({ type: "INCREMENT" });
    };
    handleDecrement = () => {
        this.props.dispatch({ type: "DECREMENT" });
    };
    render() {
        return (
            <div>
                <h2>Count: {this.props.count}</h2>
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        count: state.count,
    };
}
export default connect(mapStateToProps)(Counter);