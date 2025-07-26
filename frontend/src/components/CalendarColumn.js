// import "../css/CalendarColumn.css";
import DataColumn from "./DataColumn";

const CalendarColumn = ({ currentDate, budgetData, expenses }) => {
	const getMonthlyTotal = () => {
		return expenses
			.filter((expense) => {
				const date = new Date(expense.EpochDate);
				return (
					date.getMonth() === currentDate.getMonth() && // JS months are 0-based (0 = Jan)
					date.getFullYear() === currentDate.getFullYear()
				);
			})
			.reduce((total, expense) => total + parseFloat(expense.Amount), 0);
	};

	const monthlyTotal = getMonthlyTotal();
	const monthlySaved = budgetData.disposable_income - monthlyTotal;

	const calendarItems = [
		{
			id: "monthly_total",
			title: "Monthly Total",
			value: monthlyTotal,
		},
		{
			id: "monthly_saved",
			title: "Monthly Saved",
			value: monthlySaved,
			className:
				monthlyTotal > budgetData.disposable_income
					? "datacolumn-neg"
					: "datacolumn-pos",
		},
	];

	return <DataColumn data={calendarItems} className="calendarcolumn" />;
};

export default CalendarColumn;
