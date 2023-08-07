import { useEffect } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "@emotion/react";

function App() {

    const dispatch = useDispatch()
    const { status } = useSelector(state => state.user)

    const theme = useTheme()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (status !== 'login') {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Sidebar />
            <main className="content" >
                <Outlet />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={theme.palette.mode} />
            </main>
        </>
    );
}

export default App;
