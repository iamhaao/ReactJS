import React, { useState } from 'react';

function ControlledForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name} \n Email: ${email}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type='text' value={name} onChange={(event) => setName(event.target.value)}></input>
            </label>
            <br></br>
            <label>
                Name:
                <input type='text' value={email} onChange={(event) => setEmail(event.target.value)}></input>
            </label>
            <br></br>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default ControlledForm;