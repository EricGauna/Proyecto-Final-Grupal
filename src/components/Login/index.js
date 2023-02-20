import { useContext } from "react"
import { Navigate } from "react-router";
import { UserContext } from "../../contexto/UserContext";
import { login } from "../../services/user";

const RegistreUser = () => {Navigate(`/registerform`)
}

export const Login = () => {
    const { loginUser } = useContext(UserContext)
    const loginNow = async (event) => {
        try {
            event.preventDefault()
            const username = event.target.username.value
            const password = event.target.password.value
            const loggedUser = await login({ username, password })
            loginUser(loggedUser)
        } catch (e) {
            alert(e)
            event.target.reset()
        }
    }
    return (<div>
        <form onSubmit={loginNow}>
        <input name="username" type="text" className="form-control" placeholder="Nombre de usuario" />
        <input name="password" type="password" className="form-control" placeholder="Contraseña" />
        <button className="btn btn-primary">Login</button>
        </form>
        <a href='${RegistreUser}'>Registrase</a>
    </div>)
    
}