import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProblema } from './views/CreateProblema';
import { ErrorPage } from './views/ErrorPage';
import { Main } from './views/Main';
import { DetalleProblema } from "./views/DetalleProblema";
import {  Registeruser } from "./views/RegisterUser";
import { Cabecera } from "./components/Cabecera";



export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/registeruser",
      element: <Registeruser />,
    },
    {
      path: "/createproblema",
      element: <CreateProblema />,
    },
    {
      path: "/problemas/:problemasId",
      element: <DetalleProblema />,
    }

  ])
  return (
  <div>
  <div>
      <Cabecera></Cabecera>
      </div>
      

    <div>
      <RouterProvider router={router} />
      </div>
    </div>


  );
}


