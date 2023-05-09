import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function RootLayout() {
    return(
        <div className="root-layout">
            <NavBar />
            <main className="outlet-layout">
                <Outlet />
            </main>
        </div>
    )
}