import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProblema } from './views/CreateProblema';
import { ErrorPage } from './views/ErrorPage';
import { Main } from './views/Main';
import { Login } from './components/Login';
import { DetalleProblema } from "./views/DetalleProblema";
import { RegisterForm } from "./views/RegisterUser";



export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/registeruser",
      element: <RegisterForm/>,
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
    <body>
    <div>
      <header className="header">
        <h1>CIUDAD ACCESIBLE</h1>
        <div>
          <Login />
        </div>
      </header>
      <div>
        <RouterProvider router={router} />
      </div>
      </div>
    </body>
  );
}


