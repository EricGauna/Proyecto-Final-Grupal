import { useContext } from "react"
import { UserContext } from "../../contexto/UserContext";
import { login } from "../../services/user";

export const Login = () => {
    const { loginUser } = useContext(UserContext)
    const loginNow = async (event) => {
        try {
            event.preventDefault()
            const email = event.target.email.value
            const password = event.target.password.value
            const loggedUser = await login({ email, password })
            loginUser(loggedUser)
        } catch (e) {
            alert(e)
            event.target.reset()
        }
    }
    return (<div>
        <form onSubmit={loginNow}>
        <input name="email" type="email" className="form-control" placeholder="Correo electronico" />
        <input name="password" type="password" className="form-control" placeholder="Contraseña" />
        <button className="btn btn-primary">Login</button>
        </form>
        <a href='/registeruser'>Registrase</a>
    </div>)
    
}