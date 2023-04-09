import { Login } from "../Login";
import "./index.css";

export const Cabecera = () => {
  return (
    <header className="header">
      <h1>
        <a href="http://localhost:3000/" className="Inicio">
          CIUDAD ACCESIBLE
        </a>
      </h1>
        <p className="description-cabecera">Encuentra y valora problemas de acccesibilidad dentro de ciudad</p>
      <div>
        <Login />
      </div>
    </header>
  );
};
