import React, { useState, useEffect } from 'react';

export const User= () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Bienvenid@ {user.name}!</h1>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
        </div>
    );
}
