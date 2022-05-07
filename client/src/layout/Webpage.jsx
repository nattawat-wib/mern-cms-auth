import { Outlet } from "react-router-dom";
import Navbar from "./../components/webpage/Navbar";
import Footer from "./../components/webpage/Footer";

const Webpage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
};

export default Webpage;