/**
 * API service for expense operations
 */

const API_BASE_URL = "https://localhost:7012/api";

class ExpenseService {
	constructor() {
		this.baseURL = API_BASE_URL;
	}

	/* Generic async fetcher */
	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;
		const config = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error(`API Error [${endpoint}]: `, error);
			throw error;
		}
	}

	/* Get all expenses */
	async getExpenses() {
		return this.request("/Expenses");
	}

	/* Create new expense */
	async createExpense(expenseData) {
		return this.request("/Expenses", {
			method: "POST",
			body: JSON.stringify(expenseData),
		});
	}
}

export const expenseService = new ExpenseService();
