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
        <p className="description-cabecera">Aqui podrás encontrar problemas de acccesibilidad dentro de tu ciudad y estar al tanto de todos los problemas en tu barrio. </p>
      <div>
        <Login />
      </div>
    </header>
  );
};
