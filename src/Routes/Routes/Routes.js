import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CheckOutPage from "../../Pages/CheckOutPage/CheckOutPage";
import CourseDetails from "../../Pages/CourseDetails/CourseDetails";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch(
            "https://b610-lerning-platform-server-side-mu.vercel.app/courses"
          ),
      },
      {
        path: "/course/:id",
        element: <CourseDetails></CourseDetails>,
        loader: ({ params }) =>
          fetch(
            `https://b610-lerning-platform-server-side-mu.vercel.app/course/${params.id}`
          ),
      },
      {
        path: "/checkOut/:id",
        loader: ({ params }) =>
          fetch(
            `https://b610-lerning-platform-server-side-mu.vercel.app/course/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <CheckOutPage></CheckOutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/blog",
    element: <Blog></Blog>,
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);
