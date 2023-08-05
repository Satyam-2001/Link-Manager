import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Description from "./scenes/design";
import Courses from "./scenes/courses";
import { useDispatch } from 'react-redux';
import { getCourseData } from "./store/course-slice";
import { useEffect } from "react";
import Application from '../src/root/index'
import { getDesign } from "./store/design-slice";

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
    dispatch(getCourseData())
    dispatch(getDesign())
  }, [])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
