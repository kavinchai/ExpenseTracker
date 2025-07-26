// import "../css/BudgetColumn.css";
import DataColumn from "./DataColumn";

const BudgetColumn = ({ budgetData }) => {
	const budgetItems = [
		{
			id: "monthly_paycheck",
			title: "Monthly Paycheck",
			value: budgetData.monthly_paycheck,
		},
		{
			id: "monthly_rent",
			title: "Monthly Rent",
			value: budgetData.monthly_rent,
		},
		{
			id: "disposable_income",
			title: "Disposable Income",
			value: budgetData.disposable_income,
		},
	];

	return <DataColumn data={budgetItems} className="budgetcolumn" />;
};

export default BudgetColumn;
