import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { main_theme } from "./style/theme"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Index from "./pages/index";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={main_theme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						{/* <Route element={} path="/"> </Route> */}
						<Route element={<Index />} path="/"> </Route>
					</Routes>
					<div style={{ height: "200vh" }}> </div>
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
