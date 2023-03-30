import axios from "axios";
import swal from 'sweetalert';


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
        swal({
                    title: "Algo ha ido mal!",
                    text: "Vuelve a intentarlo!",
                    icon: "warning",
                    button: "Ok!",
                  });
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
        return data
        
    } catch (error) {
        console.error(error)
        throw new Error("Wrong email o password")
    }
}

export const LikesUser = async ( config ) => {
    try {
        const response = await fetch(`http://localhost:8080/user/like`, config);
        const  data  = await response.json();
        return data;
    } catch (e) {
        return {};
    }
}