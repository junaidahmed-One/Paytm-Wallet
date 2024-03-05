import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route element={<Signin />} path="/signin" />
					<Route element={<Dashboard />} path="/dashboard" />
					<Route element={<SendMoney />} path="/send" />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
