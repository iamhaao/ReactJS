import { useState } from "react";

function CounterState({ prop }) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>COUNT of {prop}:{count}</p>
            <button onClick={inrement}>Increment</button>
        </div>
    );

    function inrement() {
        setCount(count + 1);
    }

}
export default CounterState;