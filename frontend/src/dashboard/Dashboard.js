import { useState } from "react";
import Sidebar from "../scenes/global/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <>
            <Sidebar isSidebar={isSidebar} />
            <main className="content" >
                <Outlet />
            </main>
        </>
    );
}

export default App;
