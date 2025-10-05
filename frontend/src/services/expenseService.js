/**
 * API service for expense operations
 */

const API_BASE_URL = "https://localhost:7012/api";

class ExpenseService {
	constructor() {
		this.baseURL = API_BASE_URL;
	}

	/**
	 * Generic fetch wrapper with error handling
	 */
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

			// Check if response has content before trying to parse JSON
			const contentType = response.headers.get("content-type");
			const hasJsonContent =
				contentType && contentType.includes("application/json");

			// For 204 No Content or empty responses, return null
			if (response.status === 204 || !hasJsonContent) {
				return null;
			}

			// Check if response body is empty
			const text = await response.text();
			if (!text) {
				return null;
			}

			return JSON.parse(text);
		} catch (error) {
			console.error(`API Error [${endpoint}]:`, error);
			throw error;
		}
	}

	/**
	 * Get expenses for a specific year and month
	 */
	async getExpenses(year, month) {
		return this.request(`/Expenses/${year}/${month}`);
	}

	/**
	 * Create a new expense
	 */
	async createExpense(expenseData) {
		return this.request("/Expenses", {
			method: "POST",
			body: JSON.stringify(expenseData),
		});
	}

	/**
	 * Update an existing expense
	 */
	async updateExpense(id, expenseData) {
		return this.request(`/Expenses/${id}`, {
			method: "PUT",
			body: JSON.stringify(expenseData),
		});
	}

	/**
	 * Delete an expense
	 */
	async deleteExpense(id) {
		return this.request(`/Expenses/${id}`, {
			method: "DELETE",
		});
	}
}

// Export a singleton instance
export const expenseService = new ExpenseService();
