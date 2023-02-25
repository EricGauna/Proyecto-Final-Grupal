import { useContext, useState } from "react";
import { UserContext } from "../../contexto/UserContext";
import { login } from "../../services/user";
import "./index.css";

export const Login = () => {
  const { loginUser } = useContext(UserContext);
  const loginNow = async (event) => {
    try {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const loggedUser = await login({ email, password });
      loginUser(loggedUser);
    } catch (e) {
      alert(e);
      event.target.reset();
    }
  };

  // Show Password Function //

  const [EyeState, SetEyeState] = useState(false);
  const handleClick = () => {
    SetEyeState((EyeState) => !EyeState);
  };
  let EyeStateCheck = EyeState ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";

  return (
    <div className="LogInBox">
      <form onSubmit={loginNow} className="LogInForm">
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Correo electronico"
        />
        <div className="Password_Container">
          <input
            name="password"
            type={EyeState ? "text" : "password"}
            className="form-control"
            placeholder="Contraseña"
          />
          <i className={EyeStateCheck} id="showpass" onClick={handleClick}></i>
        </div>
        <button className="btn btn-primary">Login</button>
        <a href="/registeruser">Registrase</a>
      </form>
    </div>
  );
};
