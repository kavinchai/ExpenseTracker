import { useEffect, useState } from "react";
import { expenseService } from "../services/expenseService";

export const useExpenses = (year, month) => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchExpenses = async () => {
		try {
			setLoading(true);
			const data = await expenseService.getExpenses(year, month);
			setExpenses(data || []);
		} catch (error) {
			console.error("Error fetching expenses: ", error);
			setExpenses([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (year && month) {
			fetchExpenses();
		}
	}, [year, month]);

	const refreshExpenses = () => {
		return fetchExpenses();
	};

	return { expenses, loading, refreshExpenses };
};
