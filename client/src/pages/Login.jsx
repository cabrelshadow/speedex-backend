"use client";

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import React from "react";

export default function Login() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const toast = useToast({ position: "top-right" });
	const { username, password } = userData;
	function onInputChange(e) {
		setUserData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	}
	function onSubmit(e) {
		e.preventDefault();
		if (!username || !password) {
			toast({
				status: "error",
				title: "Alert",
				description: "Veuillez remplir les champs...",
			});
		}
	}
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack
				spacing={8}
				mx={"auto"}
				maxW={"lg"}
				py={12}
				px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Veuillez-vous connecter</Heading>
					{/* <Text
						fontSize={"lg"}
						color={"gray.600"}>
						to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
					</Text> */}
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Num d'utilisateur</FormLabel>
							<Input
								type='text'
								required
								name='username'
								onChange={onInputChange}
								value={username}
							/>
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Mot de passe</FormLabel>
							<Input
								type='password'
								required
								name='password'
								onChange={onInputChange}
								value={password}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}>
								<Checkbox>Remember me</Checkbox>
								<Text color={"blue.400"}>Mot de passe oublié?</Text>
							</Stack>
							<Button
								bg={"teal.400"}
								color={"white"}
								onClick={onSubmit}
								_hover={{
									bg: "teal.500",
								}}>
								Connectez-vous
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
