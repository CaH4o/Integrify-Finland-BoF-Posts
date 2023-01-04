import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import Error from "./pages/Error";

export default function AppRouter(): JSX.Element {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <Error />,
        children: [
          {
            path: "users",
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
          {
            path: "posts",
            children: [
              {
                index: true,
                element: <Home />,
              },

              {
                path: ":id",
                element: <SinglePost />,
              },
            ],
          },
        ],
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router} />;
}
