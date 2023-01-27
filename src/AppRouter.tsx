import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import Error from "./pages/Error";
import AppPage from "./pages/AppPage";

export default function AppRouter(): JSX.Element {
  const router = createBrowserRouter(
    [
      {
        path: "",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "posts",
        element: <AppPage />,
        children: [
          {
            index: true,
            element: <Posts />,
          },

          {
            path: ":id",
            element: <SinglePost />,
          },
        ],
      },
      {
        path: "users",
        element: <AppPage />,
        children: [
          {
            index: true,
            element: <Users />,
          },

          {
            path: ":id",
            element: <SingleUser />,
          },
        ],
      },
    ],
    {
      basename: "/bof-posts",
    }
  );

  return <RouterProvider router={router} />;
}
