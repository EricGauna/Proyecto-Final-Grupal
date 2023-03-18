import { createContext, useState, useEffect } from "react";
import { LikesUser } from "../services/user";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser && storedUser.token) {
            setUser(storedUser);
        } else {
            setUser(undefined);
        }
    }, []);

    const loginUser = ({ name = "user", email, token, role, id }) => {
        const newUser = { name, email, token, role, id };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const getLikes = async (config) => {
        try {
            const { data } = await LikesUser(config);
            setUser(prevUser => ({ ...prevUser, likes: data }));
            return data
        } catch (error) {
            console.error(error);
        }
    };

    const isAuthorized = () => {
        return user !== undefined && user.role === "admin";
    };
    const isUser = () => {
        return user !== undefined && user.role;
    };
    const isloggedUser = () => {
        if (user !== undefined) {
            return user;
        }
        return undefined;
    };
    const loggedUser = () => {
        if (isUser()) {
            return user;
        }
        return undefined;
    };
    const logOut = () => {
        setUser(undefined);
        localStorage.removeItem("user");
        window.location.href = "/";
    };


    return <UserContext.Provider value={{ isAuthorized, loggedUser, loginUser, logOut, isloggedUser, isUser, getLikes }}>
        {children}
    </UserContext.Provider>
}
