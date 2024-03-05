import axios from "axios";
import { BottomWarning } from "../componets/BottomWarning";
import { Button } from "../componets/Button";
import { Heading } from "../componets/Heading";
import { InputLabel } from "../componets/InputLabel";
import { Subheading } from "../componets/Subheading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
				<div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
					<Heading label="Sign In" />
					<Subheading
						label={"Enter your credentials to access your account"}
					/>
					<InputLabel
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="johdoe@gmail.com"
						label={"Email"}
					/>
					<InputLabel
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="123456"
						label={"Password"}
					/>
					<div>
						<Button
							onClick={async () => {
								const response = await axios.post(
									"http://localhost:3000/api/v1/user/signin",
									{
										username: email,
										password,
									}
								);
								localStorage.setItem(
									"token",
									response.data.token
								);
								navigate("/dashboard");
							}}
							label={"Sign In"}
						/>
					</div>

					<BottomWarning
						label="Don't have an account?"
						buttonText={"Sign Up"}
						to={"/signup"}
					/>
				</div>
			</div>
		</div>
	);
}
