import React, { useState } from 'react';
import { RegisterUser } from '../services/user';
import "./register.css"
import swal from 'sweetalert';


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await RegisterUser({ name, email, password });
            console.log(data);
            swal("Good job!", "Usuario registrado", "success");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                swal({
                    title: "Algo ha ido mal!",
                    text: "Vuelve a intentarlo!",
                    icon: "warning",
                    button: "Ok!",
                  });
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="form-container-register">
        <form onSubmit={handleSubmit} className="formulario-register">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>
            <button className="registro" type="submit">Registrarse</button>
        </form>
        </div>
    );
}


