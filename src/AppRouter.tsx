import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import Error from "./pages/Error";

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
      basename: "/bof-posts/",
    }
  );

  return <RouterProvider router={router} />;
}
