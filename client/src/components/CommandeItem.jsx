import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	GridItem,
	Heading,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Text,
} from "@chakra-ui/react";
import { FaChevronDown, FaMessage, FaPhone } from "react-icons/fa6";
import React from "react";

function CommandeItem() {
	return (
		<GridItem w={"full"}>
			<Card>
				<CardHeader>
					<Flex alignItems={"center"}>
						<Heading size={"md"}>Commande</Heading>
						<Spacer />
						<Badge>
							<Text>CMD-899</Text>
						</Badge>
					</Flex>
				</CardHeader>
				<CardBody>
					<Box>
						<Text>Nom du client: </Text>
						<Text>
							Contact : 0000000 <Icon as={FaPhone}></Icon>{" "}
							<Icon as={FaMessage} />
						</Text>
						<Text>Ville de livraison:</Text>
						<Text>Adresse de livraison:</Text>
					</Box>
				</CardBody>
				<CardHeader>
					<Flex
						gap={2}
						flexDirection={{ base: "column", xl: "row" }}>
						<Button
							variant={"black"}
							bg={"blackAlpha.400"}
							_hover={{ bg: "blackAlpha.500" }}>
							Voir les articles commandés
						</Button>
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<FaChevronDown />}
								variant={"green"}
								bg={"green.400"}
								_hover={{ bg: "green.500" }}>
								Status
							</MenuButton>
							<MenuList>
								<MenuItem>Livrée</MenuItem>
								<MenuItem color={"red.700"}>Annulée</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</CardHeader>
			</Card>
		</GridItem>
	);
}

export default CommandeItem;
