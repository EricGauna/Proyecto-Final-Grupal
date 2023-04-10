import { useContext, useState, useEffect } from "react";
import { login } from "../../services/user";
import { UserContext } from "../../contexto/UserContext";
import swal from 'sweetalert';

import "./index.css"

export const Login = () => {
  const { loginUser, loggedUser, logOut } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  const loginNow = async (event) => {
    try {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const { data } = await login({ email, password })
      loginUser(data);
      console.log(data);
      setIsLoggedIn(true);
        swal({
                title: `Bienvenid@ ${data.name}!`,
                text: "Ya puede continuar!",
                icon: "success",
                button: "Ok!",
              }); 
    } catch (e) {
      swal({
        title: `Email o pass equivocado!`,
        text: "Vuelve a intentar!",
        icon: "warning",
        button: "Ok!",
      });
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

  // Reveal Box Functions //

  const [BoxState, SetBoxState] = useState(false);
  const handleClick2 = () => {
  SetBoxState((BoxState) => !BoxState);
  };
  let BoxStateCheck = BoxState ? "LogInBoxOpen" : "LogInBoxClosed";
  let BoxStateCheck2 = BoxState ? "LogInForm" : "LogInFormHidden";

  const [BoxState2, SetBoxState2] = useState(false);
  const handleClick3 = () => {
  SetBoxState2((BoxState2) => !BoxState2);
  };
  let BoxStateCheck3 = BoxState2 ? "LogInBoxLoggedIn" : "LogInBoxLoggedInClosed";
  let BoxStateCheck4 = BoxState2 ? "UserDetails" : "UserDetailsHidden";

  const [BoxState3, SetBoxState3] = useState(false);
  const handleClick4 = () => {
  SetBoxState3((BoxState3) => !BoxState3);
  };
  let BoxStateCheck5 = BoxState3 ? "" : "Bienvenid@ ";

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = loggedUser();
    if (user) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loggedUser]);

  return (
    <div onClick={isLoggedIn ? handleClick3 : handleClick2} className={isLoggedIn ? `${BoxStateCheck3}` : `${BoxStateCheck}`}>
      {loading ? (
        <h2 className="WelcomeText">Loading...</h2>
      ) : (
        <>
            {isLoggedIn ? (
              <div>
                <h2 className="WelcomeText">{BoxStateCheck5} {loggedUser() ? loggedUser().name : ""}</h2>
                <div className={BoxStateCheck4} onClick={(e) => {e.stopPropagation()}}>
                <div className="RoleDetails">
                <p className="Email-Text">Mail: <br></br>{user.email}</p>
                <p className="Role-Text">Rol: <br></br>{user.role}</p>
                </div>
                <button className="LogOut" onClick={() => {
                logOut();
                handleClick4();
                }}>Log Out</button>
                </div>
              </div>
          ) : (
            <div>
              <h2 className="WelcomeText">Log-In</h2>
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
              <button className="Log-InButton">Login</button>
              <div className="Buttons">
              <i className="NO">¿No tienes cuenta? </i>
              <a className="Register-Button" href="/registeruser">Registrate</a>
              </div>
            </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};