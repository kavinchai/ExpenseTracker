import "../css/App.css";
import Calendar from "../components/Calendar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Navigate
							to={`/expenses/${new Date().getFullYear()}/${
								new Date().getMonth() + 1
							}`}
							replace
						/>
					}
				/>
				<Route path="/expenses/:year/:month" element={<Calendar />} />
			</Routes>
		</Router>
	);
};

export default App;
