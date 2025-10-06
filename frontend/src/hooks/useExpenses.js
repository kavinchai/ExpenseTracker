import { useEffect, useState, useCallback } from "react";
import { expenseService } from "../services/expenseService";

export const useExpenses = (year, month) => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchExpenses = useCallback(async () => {
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
	}, [year, month]);

	useEffect(() => {
		fetchExpenses();
	}, [fetchExpenses]);

	const refreshExpenses = () => {
		return fetchExpenses();
	};

	return { expenses, loading, refreshExpenses };
};
