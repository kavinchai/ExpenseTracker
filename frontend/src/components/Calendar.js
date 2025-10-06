import { useParams, useNavigate } from "react-router-dom";
import { useCalendar } from "../hooks/useCalendar";
import { useExpenses } from "../hooks/useExpenses";
import CalendarGrid from "./CalendarGrid";
import CalendarColumn from "./CalendarColumn";
import BudgetColumn from "./BudgetColumn";
import budgetJson from "../data/budget.json";
import "../css/Calendar.css";

const Calendar = () => {
	const navigate = useNavigate();
	const { year: urlYear, month: urlMonth } = useParams();

	const year = parseInt(urlYear);
	const month = parseInt(urlMonth) - 1;
	const days = useCalendar(year, month);
	const { expenses, loading, refreshExpenses } = useExpenses(year, month + 1);
	const budgetData = budgetJson.data;

	const changeMonth = (offset) => {
		const newDate = new Date(year, month);
		newDate.setMonth(newDate.getMonth() + offset);
		navigate(`/expenses/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="calendar-base">
			<div className="calendar-header">
				<button className="calendar-nav-btn" onClick={() => changeMonth(-1)}>
					{"<"}
				</button>
				<h2 className="calendar-month">
					{new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
					{year}
				</h2>
				<button className="calendar-nav-btn" onClick={() => changeMonth(1)}>
					{">"}
				</button>
			</div>
			<div className="calendar-body">
				<BudgetColumn budgetData={budgetData} />
				<CalendarGrid
					days={days}
					month={month}
					year={year}
					expenses={expenses}
					refreshExpenses={refreshExpenses}
				/>
				<CalendarColumn
					currentDate={new Date(year, month)}
					budgetData={budgetData}
					expenses={expenses}
				/>
			</div>
		</div>
	);
};

export default Calendar;
