import axios from "axios";

export const RegisterUser = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/registeruser",
            {
                name,
                email,
                password,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return data;
    } catch (error) {
        console.error(error);
        throw new Error("");
    }
};

export const login = async ({ email, password, }) => {
    try {
        const { data } = await axios.post('http://localhost:8080/login', {
            email,
            password,
        },
            {
                headers: { 'Content-Type': 'application/json' }
            })
console.log(data);
        return data
        
    } catch (error) {
        console.error(error)
        throw new Error("Wrong email o password")
    }
}