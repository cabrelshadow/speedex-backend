import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'>
			<Spinner
				size='xl'
				color='teal.500'
			/>
		</Flex>
	);
};

export default LoadingPage;
