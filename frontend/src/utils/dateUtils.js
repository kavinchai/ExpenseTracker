/**
 * Date utility functions for the expense tracker
 */

export const dateUtils = {
	/**
	 * Check if two dates are the same day
	 */
	isSameDay: (date1, date2) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	},

	/**
	 * Check if a date is in the same month/year
	 */
	isSameMonth: (date, year, month) => {
		return date.getFullYear() === year && date.getMonth() === month;
	},

	/**
	 * Get days in a month
	 */
	getDaysInMonth: (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	},

	/**
	 * Get first day of month (0-6, Sunday-Saturday)
	 */
	getFirstDayOfMonth: (year, month) => {
		return new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
	},

	/**
	 * Convert epoch milliseconds to Date
	 */
	epochToDate: (epochMs) => {
		return new Date(epochMs);
	},

	/**
	 * Format date for display
	 */
	formatDate: (
		date,
		options = { month: "long", day: "numeric", year: "numeric" }
	) => {
		return date.toLocaleString("default", options);
	},

	/**
	 * Calculate cell date for calendar grid
	 */
	calculateCellDate: (day, isCurrentMonth, baseYear, baseMonth) => {
		const cellDate = new Date(baseYear, baseMonth, day);

		if (!isCurrentMonth) {
			if (day < 15) {
				cellDate.setMonth(baseMonth + 1);
			} else {
				cellDate.setMonth(baseMonth - 1);
			}
		}

		return cellDate;
	},

	/**
	 * Filter expenses by date
	 */
	filterExpensesByDate: (expenses, targetDate) => {
		return expenses.filter((expense) => {
			const expenseDate = dateUtils.epochToDate(expense.EpochDate);
			return dateUtils.isSameDay(expenseDate, targetDate);
		});
	},

	/**
	 * Filter expenses by month/year
	 */
	filterExpensesByMonth: (expenses, year, month) => {
		return expenses.filter((expense) => {
			const expenseDate = dateUtils.epochToDate(expense.EpochDate);
			return dateUtils.isSameMonth(expenseDate, year, month);
		});
	},
};
