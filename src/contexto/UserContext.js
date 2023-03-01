import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [carrito, setElementInCarrito] = useState([])

    useEffect(() => {
        setElementInCarrito(JSON.parse(localStorage.getItem("carrito") || "[]"));
        setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }, [])

    const loginUser = ({ username = "user", email, image = "fakephoto.com", token }) => {
        /* if (nickname && token) {
            setUser({ nickname, token })
        } else {
            throw new Error("No me has pasado todo!")
        }*/
        if (!email || !token) {
            throw new Error("No me has pasado todo!")
        }
        const newUser = { username, email, token, image }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser));
    }
    const isAuthorized = () => {
        return user !== undefined && !!user.token
    }
    const loggedUser = () => {
        if (isAuthorized()) {
            return user
        }
        return undefined
    }
    const logOut = () => {
        setUser(undefined)
        window.location.hash = "/"
    }
    return <UserContext.Provider value={{ isAuthorized, loggedUser, loginUser, logOut, carrito, setElementInCarrito }}>
        {children}
    </UserContext.Provider>
}