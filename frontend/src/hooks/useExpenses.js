import { useEffect, useState } from "react";

export const useExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchExpenses = async () => {
		try {
			setLoading(true);
			const response = await fetch("https://localhost:7012/api/Expenses");
			const data = await response.json();
			setExpenses(data);
		} catch (error) {
			console.error("Error fetching expenses: ", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchExpenses();
	}, []);

	const refreshExpenses = () => {
		return fetchExpenses();
	};

	return { expenses, loading, refreshExpenses };
};
