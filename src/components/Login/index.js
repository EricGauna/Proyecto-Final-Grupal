import { useContext, useState, useEffect } from "react";
import { login } from "../../services/user";
import { UserContext } from "../../contexto/UserContext";

import "./index.css"

export const Login = () => {
  const { loginUser, loggedUser,logOut } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  const loginNow = async (event) => {
    try {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const { data } = await login({ email, password })
      console.log(data);
      loginUser(data);
      setIsLoggedIn(true);
    } catch (e) {
      alert(e)
      event.target.reset()
    }
  };

  // Show Password Function //

  const [EyeState, SetEyeState] = useState(false);
  const handleClick = () => {
    SetEyeState((EyeState) => !EyeState);
  };
  let EyeStateCheck = EyeState ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
  //

  // Reveal Box Function //

  const [BoxState, SetBoxState] = useState(false);
  const handleClick2 = () => {
  SetBoxState((BoxState) => !BoxState);
  };
  let BoxStateCheck = BoxState ? "LogInBoxOpen" : "LogInBoxClosed";
  let BoxStateCheck2 = BoxState ? "LogInForm" : "LogInFormHidden";


  useEffect(() => {
    const user = loggedUser();
    if (user) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loggedUser]);

  useEffect(() => {
    const user = loggedUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, [loggedUser]);
  

  return (
    <div onClick={handleClick2} className={isLoggedIn ? "LogInBoxLoggedIn" : `${BoxStateCheck}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
            {isLoggedIn ? (
              <div>
                <h1><a href="/user" className="Inicio">Bienvenid@, {loggedUser() ? loggedUser().name : "Usuario"}!</a></h1>
                <button onClick={logOut}>Log Out</button>
              </div>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};