import axios from "axios";
// kminchelle, 0lelplR
export const login = async ({ username, password, name }) => {
    try {
        const { data } = await axios.post('http://localhost:8080/registeruser', {
            username,
            password,
            name,
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