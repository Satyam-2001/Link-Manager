import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Description from "./scenes/design";
import Courses from "./scenes/courses";
import { useDispatch } from 'react-redux';
import { getCourseData } from "./store/course-slice";
import { useEffect } from "react";
import Application from './pages/root/index'
import { getDesign } from "./store/design-slice";
import Testimonials from "./scenes/testimonials";
import { getTestimonialData } from "./store/testimonial-slice";
import Login from "./pages/login";

window.Buffer = window.Buffer || require("buffer").Buffer;

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [
    {
      path: '/',
      element: <Application />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '',
          element: <Description />
        },
        {
          path: 'courses',
          element: <Courses />
        },
        {
          path: 'testimonials',
          element: <Testimonials />
        }]
    }
  ]
}])

function RootLayout() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Outlet />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDesign())
    dispatch(getCourseData())
    dispatch(getTestimonialData())
  }, [])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
