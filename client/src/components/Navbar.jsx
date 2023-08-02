import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	return (
		<Flex
			p={3}
			bg={"whitesmoke"}
			alignItems={"center"}>
			<Heading size={{ base: "md", xl: "xl" }}>SPEEDEX</Heading>
			<Spacer />
			<Button
				onClick={() => {
					navigate("/login");
				}}
				variant={"teal"}
				bg={"teal.400"}
				_hover={{ bg: "teal.500" }}>
				Connexion
			</Button>
		</Flex>
	);
}

export default Navbar;
