import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider, Typography } from "@mui/material";
import { lightTheme, darkTheme } from "./style/theme"
import { CssBaseline } from "@mui/material";

import Index from "./pages/webpage/Index";
import ArticleDetail from "./pages/webpage/ArticleDetail";
import Result from "./pages/webpage/Result";
import Notfound from "./pages/404";

import Login from "./pages/controlpanel/Login";
import ArticleAll from "./pages/controlpanel/ArticleAll";
import ArticleAdd from "./pages/controlpanel/ArticleAdd";
import ArticleEdit from "./pages/controlpanel/ArticleEdit";
import AddMember from "./pages/controlpanel/AddMember";
import ChangePassword from "./pages/controlpanel/ChangePassword";

import ControlPanel from "./layout/ControlPanel";
import Webpage from "./layout/Webpage";

export const ThemeModeSwitcher = createContext("light");

function App() {
    const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "light");

    useEffect(() => {
        localStorage.setItem("themeMode", themeMode);
    }, [themeMode])

    // const lightTheme = createTheme({
    //     palette: {
    //         mode: themeMode,
    //         primary: {
    //             main: "#219EBC",
    //             light: "#8ECAE6",
    //             dark: "#023047",
    //             contrastText: "#fff"
    //         },
    //         secondary: {
    //             main: "#FFB703",
    //             dark: "#FB8500",
    //             contrastText: "#fff"
    //         },
    //         dark: {
    //             dark: "#212529",
    //             main: "#343a40",
    //             light: "#6c757d",
    //         },
    //         light: {
    //             main: "#fff"
    //         },
    //         text: {
    //             dark: "#212529",
    //             main: "#343a40",
    //             light: "#6c757d",
    //             disabled: "#ced4da"
    //         }
    //     },
    //     typography: {
    //         fontFamily: "Kanit, sans-serif",
    //     }
    // })

    console.log(lightTheme);
    console.log(darkTheme);
    console.log(`${themeMode}Theme`);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
                <ThemeModeSwitcher.Provider value={{themeMode, setThemeMode}}>
                    <BrowserRouter>
                        <CssBaseline />
                        <Routes>

                            {/* WEPAGE */}
                            <Route path="/" element={<Webpage />} >
                                <Route index element={<Index />} />

                                <Route path="article" element={<Result />} />
                                <Route path="article/:category" element={<Result />} />
                                <Route path="article/:category/:articleUrl" element={<ArticleDetail />} />

                                <Route path="search" element={<Result />} />
                            </Route>

                            <Route path="/cp" element={<Login />} />

                            {/* CONTROL PANEL */}
                            <Route path="/cp" element={<ControlPanel />}>
                                {/* <Route index element={<Login />} /> */}
                                <Route path="article" element={<ArticleAll />} />
                                <Route path="article/add" element={<ArticleAdd />} />
                                <Route path="article/edit/:articleUrl" element={<ArticleEdit />} />
                                <Route path="member/add" element={<AddMember />} />
                                <Route path="member/edit-password" element={<ChangePassword />} />
                            </Route>

                            <Route path="/*" element={<Notfound />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeModeSwitcher.Provider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
