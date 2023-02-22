import axios from "axios";
// kminchelle, 0lelplR
export const RegisterUser = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post('http://localhost:8080/registeruser', {
            name,
            email,
            password,
        },
            {
                headers: { 'Content-Type': 'application/json' }
            })

        return data
    } catch (error) {
        console.error(error)
        throw new Error("No valid username")
    }
}

export const login = async ({ email, password, }) => {
    try {
        const { data } = await axios.post('http://localhost:8080/login', {
            email,
            password,
        },
            {
                headers: { 'Content-Type': 'application/json' }
            })

        return data
    } catch (error) {
        console.error(error)
        throw new Error("No valid username")
    }
}