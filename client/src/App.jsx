import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { main_theme } from "./style/theme"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import Result from "./pages/Result";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={main_theme}>
				<BrowserRouter>
					{/* <Routes>
						<Route path={"/cp"} >
						</Route>
					</Routes> */}
					<Navbar />
					<Routes>
						<Route index path="/" element={<Index />} />

						<Route path="/article" element={<Result />} />
						<Route path="/article/:category" element={<Result />} />
						<Route path="/article/:category/:url" element={<ArticleDetail />} />

						<Route path="/search" element={<Result />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
