import { Outlet } from "react-router-dom";

const ControlPanel = ({ children }) => {    
    return(
        <>
            { children }
            <Outlet/>
        </>
    )
}

export default ControlPanel;