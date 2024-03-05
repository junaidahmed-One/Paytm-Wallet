import { useEffect, useState } from "react";
import { AppBar } from "../componets/AppBar";
import { Balance } from "../componets/Balance";
import { Users } from "../componets/Users";
import axios from "axios";

export function Dashboard() {
	const [value, setValue] = useState();

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/v1/account/balance", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				const balance = res.data.balance;
				setValue(parseFloat(balance).toFixed(2));
			})
			.then((err) => console.log("Error " + err));
	}, [value]);
	return (
		<div>
			<AppBar />
			<div className="m-8">
				<Balance value={value} />
				<Users />
			</div>
		</div>
	);
}
