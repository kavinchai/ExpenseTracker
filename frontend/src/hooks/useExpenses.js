import { useEffect, useState } from "react";
import { expenseService } from "../services/expenseService";

export const useExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchExpenses = async () => {
		try {
			setLoading(true);
			const data = await expenseService.getExpenses();
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
