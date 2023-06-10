import { Component } from "react";

class Counter extends Component {
    constructor(pops) {
        super(pops);
        this.state = {
            count: 0
        };
        this.increment = this.increment.bind(this);
    }
    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <p>COUNT of {this.props.who}:{this.state.count}</p>
                <button onClick={this.increment}>increment</button>
            </div>
        );
    }


}
export default Counter;