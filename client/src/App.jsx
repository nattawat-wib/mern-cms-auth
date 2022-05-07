import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { main_theme } from "./style/theme"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/webpage/Index";
import ArticleDetail from "./pages/webpage/ArticleDetail";
import Result from "./pages/webpage/Result";

import Login from "./pages/controlpanel/Login";
import ArticleAll from "./pages/controlpanel/ArticleAll";
import AddArticle from "./pages/controlpanel/ArticleAdd";
import AddMember from "./pages/controlpanel/AddMember";
import ChangePassword from "./pages/controlpanel/ChangePassword";

import ControlPanel from "./layout/ControlPanel";
import Webpage from "./layout/Webpage";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={main_theme}>
				<BrowserRouter>
					<Routes>

						{/* WEPAGE */}
						<Route path="/" element={<Webpage />} >
							<Route index element={<Index />} />

							<Route path="article" element={<Result />} />
							<Route path="article/:category" element={<Result />} />
							<Route path="article/:category/:url" element={<ArticleDetail />} />

							<Route path="search" element={<Result />} />
						</Route>

						<Route path="/cp" element={<Login />} />

						{/* CONTROL PANEL */}
						<Route path="/cp" element={<ControlPanel />}>
							{/* <Route index element={<Login />} /> */}
							<Route path="article" element={<ArticleAll />} />
							<Route path="article/add" element={<AddArticle />} />
							<Route path="member/add" element={<AddMember />} />
							<Route path="member/edit-password" element={<ChangePassword />} />
						</Route>

					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
