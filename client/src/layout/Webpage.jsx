import { Outlet } from "react-router-dom";
import Navbar from "./../components/webpage/Navbar";
import Footer from "./../components/webpage/Footer";

const Webpage = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Outlet />
            <Footer />
        </>
    )
};

export default Webpage;