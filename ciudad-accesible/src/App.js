import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProblema } from './views/CreateProblema';
import { ErrorPage } from './views/ErrorPage';


export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/createproblem",
      element: <CreateProblema />,
      errorElement: <ErrorPage/>,
}

  ])
  return (
    <body>
      <header>
        <h1>CIUDAD ACCESIBLE</h1>
      </header>
      <div>
        <RouterProvider router={router} />
      </div>
    </body>
  );
}


