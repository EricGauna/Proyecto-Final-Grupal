import React, { useState } from 'react';
import { RegisterUser } from '../services/user';
import "./register.css"

export const Registeruser = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await RegisterUser ({ name, email, password });
            console.log(data);
        } catch (error) {
            console.error(error);
        };
    };
    
        
    

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" id="username" value={name} onChange={handleNameChange} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}


