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
  let EyeStateCheck = EyeState ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";

    // Reveal Box Function //

  const [BoxState, SetBoxState] = useState(false);
  const handleClick2 = () => {
    SetBoxState((BoxState) => !BoxState);
  };
  let BoxStateCheck = BoxState ? "LogInBoxOpen" : "LogInBoxClosed";
  let BoxStateCheck2 = BoxState ? "LogInForm" : "LogInFormHidden";

  return (
    <div className={BoxStateCheck} onClick={handleClick2}>
      <form onSubmit={loginNow} className={BoxStateCheck2} onClick={(e) => {e.stopPropagation()}}>
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
      {/* <div className="Opener" ></div> */}
    </div>
  );
};
