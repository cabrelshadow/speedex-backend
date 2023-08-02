import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Commandes from "./components/Commandes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
function App() {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<Navbar></Navbar>
				<Routes>
					<Route
						path='/'
						element={<Commandes />}
					/>
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
