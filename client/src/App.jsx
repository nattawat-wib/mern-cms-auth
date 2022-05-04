import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { main_theme } from "./style/theme"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import Search from "./pages/Search";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={main_theme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route element={<Index />} path="/" />
						<Route element={<Search />} path="/:category" />
						<Route element={<ArticleDetail />} path="/search/:searchKey" />
						<Route element={<ArticleDetail />} path="/:category/:url" />
					</Routes>
					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
