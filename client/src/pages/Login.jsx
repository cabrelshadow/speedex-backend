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
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { BASE_URL } from "../api/common";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();
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
		fetch(`${BASE_URL}auth`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		})
			.then(async (res) => {
				if (res.ok) {
					const token = await res.json();
					sessionStorage.setItem("token", token);
					toast({
						status: "success",
						title: "Bienvenue",
						description: "Heureux de vous revoir",
					});
					return navigate("/");
				}
				toast({
					status: "error",
					title: "Alert!!",
					description: "Une erreur s'est produite...",
				});
				return navigate("/login");
			})
			.catch((err) => {
				toast({
					status: "error",
					title: "Alert!!",
					description: "Une erreur s'est produite...",
				});
				return navigate("/login");
			});
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
							</Stack>
							<Button
								bg={"black"}
								color={"white"}
								onClick={onSubmit}
								_hover={{
									bg: "#333333",
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
