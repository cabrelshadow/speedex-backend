import { Container, Grid, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import CommandeItem from "./CommandeItem";
import { BASE_URL } from "../api/common";

function Commandes() {
	const [Commandes, setCommandes] = React.useState([]);

	const fetchCommandes = () => {
		fetch(`${BASE_URL}commandes`, {
			method: "GET",
			headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
		}).then(async (res) => {
			if (res.ok) {
				const getData = (await res.json()) ?? [];
				setCommandes(getData);
			}
		});
	};
	React.useEffect(() => {
		fetchCommandes();
		console.log(Commandes);
	}, []);
	return (
		<Container
			maxW={{ base: "full", xl: "9xl" }}
			p={2}>
			{Commandes.length > 0 ? (
				<Grid
					templateColumns={{
						base: "repeat(1)",
						lg: "repeat(3,1fr)",
						md: "repeat(2,1fr)",
						xl: "repeat(4,4fr)",
					}}
					gap={5}>
					{Commandes.map((commande) => (
						<CommandeItem commande={commande} />
					))}
				</Grid>
			) : (
				<Stack>
					<Heading textAlign={"center"}>Pas de commandes assignées</Heading>
				</Stack>
			)}
		</Container>
	);
}

export default Commandes;
