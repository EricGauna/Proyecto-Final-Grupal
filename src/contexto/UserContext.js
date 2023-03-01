import { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()


    const loginUser = ({ username = "user", email, password, image = "fakephoto.com", token }) => {
        /* if (nickname && token) {
            setUser({ nickname, token })
        } else {
            throw new Error("No me has pasado todo!")
        }*/

        console.log(email,username, password);
        
        if (!email || !password) {
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
    return <UserContext.Provider value={{ isAuthorized, loggedUser, loginUser, logOut }}>
        {children}
    </UserContext.Provider>
}