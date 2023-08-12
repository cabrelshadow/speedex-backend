import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Commandes from "./components/Commandes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRouter";
import theme from "./hooks/theme";
function App() {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Navbar></Navbar>
				<Routes>
					<Route
						path='/'
						element={<PrivateRoute />}>
						<Route
							path='/'
							element={<Commandes />}
						/>
					</Route>
					<Route
						path='/login'
						element={<Login />}
					/>
				</Routes>
			</ChakraProvider>
		</BrowserRouter>
	);
}

export default App;
