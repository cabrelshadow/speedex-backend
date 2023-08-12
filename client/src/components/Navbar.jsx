import {
	Button,
	Flex,
	Heading,
	Spacer,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const [token] = React.useState(sessionStorage.getItem("token"));
	const BrandColor = useColorModeValue("black", "white");
	function logout() {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("userData");
	}
	return (
		<Flex
			p={3}
			bg={"whitesmoke"}
			alignItems={"center"}>
			<Heading
				size={{ base: "md", xl: "xl" }}
				color={BrandColor}>
				SPEEDEX
			</Heading>
			<Spacer />
			{!token ? (
				<Button
					onClick={() => {
						navigate("/login");
					}}
					variant={"teal"}
					bg={"mediumseagreen"}
					_hover={{ bg: "green" }}
					color='white'>
					Connexion
				</Button>
			) : (
				<Button
					colorScheme='red'
					onClick={logout}>
					Déconnexion
				</Button>
			)}
		</Flex>
	);
}

export default Navbar;
