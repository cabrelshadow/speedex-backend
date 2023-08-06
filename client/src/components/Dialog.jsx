import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import React from "react";

function Dialog({
	title,
	children,
	hasHeader,
	hasFooter,
	cancelBtnColor,
	confirmeBtnColor,
	confirmText,
	cancelText,
	hasCancelBtn = true,
	hasConfirmeBtn = true,
	destructRef,
	onClose,
	isOpen,
}) {
	const cancelRef = React.useRef();
	return (
		<>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />
				<AlertDialogContent>
					{hasHeader && <AlertDialogHeader>{title}</AlertDialogHeader>}
					<AlertDialogCloseButton />
					<AlertDialogBody>{children}</AlertDialogBody>
					{hasFooter && (
						<AlertDialogFooter>
							{hasCancelBtn && (
								<Button
									ref={cancelRef}
									colorScheme={cancelBtnColor}>
									{cancelText ?? "Fermer"}
								</Button>
							)}
							{hasConfirmeBtn && (
								<Button colorScheme={confirmeBtnColor}>
									{confirmText ?? "Enregistrer"}
								</Button>
							)}
						</AlertDialogFooter>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default Dialog;
