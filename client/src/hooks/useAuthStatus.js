import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../api/common";

export function useAuthStatus() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const isMounted = useRef(true);
	useEffect(() => {
		if (isMounted) {
			//const auth = sessionStorage.getItem("token");
			fetch(`${BASE_URL}check`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			}).then(async (r) => {
				if (r.status === 200) {
					//const auth = sessionStorage.getItem("token");
					//if (auth) {

					setLoggedIn(true);
					const data = await r.json();
					sessionStorage.setItem("userData", JSON.stringify(data));
					//}
					setCheckingStatus(false);
				} else {
					setCheckingStatus(false);
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	return { loggedIn, checkingStatus };
}
