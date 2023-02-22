import { Login } from "../Login";
import "./index.css";

export const Cabecera = () => {
    

    return <header className="header">
        <h1>CIUDAD MAS ACCESIBLE</h1>
        <div>
            <Login />
        </div>
        <div>
            <a href="/" className="Inicio">
                <span className="fs-4">Bienvenido a mi ciudad</span>
            </a>
        </div>
    </header>
}