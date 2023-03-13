import { Login } from "../Login";
import "./index.css";

export const Cabecera = () => {
  return (
    <header className="header">
      <h1>
        <a href="http://localhost:3000/" className="Inicio">
          MEJORA TU CIUDAD
        </a>
      </h1>
      <div>
        <Login />
      </div>
    </header>
  );
};
