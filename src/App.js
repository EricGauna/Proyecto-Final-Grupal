import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProblema } from './views/CreateProblema';
import { ErrorPage } from './views/ErrorPage';
import { Main } from './views/Main';
import { DetalleProblema } from "./views/DetalleProblema";
import { Registeruser } from "./views/RegisterUser";
import { Cabecera } from "./components/Cabecera";
import { ImageGallery } from "./views/Images";
import { User } from "./views/User";
import { EditProblema } from "./views/EditProblemas";



export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/search",
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
      path: "/problemas/:problemasid",
      element: <DetalleProblema />,
    },
    {
      path: "/images",
      element: <ImageGallery />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/problemas/:problemasid/edit",
      element: <EditProblema />,
    },
  ])
  return (
    <div>
      <div>
        <Cabecera></Cabecera>
      </div>
      <div>
        <RouterProvider router={router} />
      </div>
      <div>
        <p className="footer">©️ Ciudad Accesible creado por Eric y Arturo</p>
      </div>
    </div>


  );
}


