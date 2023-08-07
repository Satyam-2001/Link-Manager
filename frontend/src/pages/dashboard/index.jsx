import { useEffect } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";

function App() {

    const dispatch = useDispatch()
    const { status } = useSelector(state => state.user)

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
            </main>
        </>
    );
}

export default App;
