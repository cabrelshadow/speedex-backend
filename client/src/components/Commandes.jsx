import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import CommandeItem from "./CommandeItem";
import { BASE_URL } from "../api/common";

function Commandes() {
	const [Commandes, setCommandes] = React.useState([]);
	const fetchCommandes = () => {
		fetch(`${BASE_URL}commandes`, { method: "GET" }).then(async (res) => {
			if (res.ok) {
				const getData = res.json() ?? [];
				setCommandes(getData);
			}
		});
	};
	return (
		<Container
			maxW={{ base: "full", xl: "9xl" }}
			p={2}>
			<Grid
				templateColumns={{
					base: "repeat(1)",
					lg: "repeat(3,1fr)",
					md: "repeat(2,1fr)",
					xl: "repeat(4,4fr)",
				}}
				gap={5}>
				<CommandeItem />
				<CommandeItem />
				<CommandeItem />
				<CommandeItem />
				<CommandeItem />
				<CommandeItem />
				<CommandeItem />
			</Grid>
		</Container>
	);
}

export default Commandes;
