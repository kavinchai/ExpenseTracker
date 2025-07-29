import CalendarCell from "./CalendarCell";
import "../css/CalendarGrid.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({
	days,
	currentDate,
	month,
	year,
	expenses,
	handleExpenseAdded,
}) => {
	return (
		<div className="calendargrid">
			{weekdays.map((day) => (
				<div key={day} className="calendargrid-days-in-week">
					{day}
				</div>
			))}

			{days.map((day, idx) => (
				<CalendarCell
					key={idx}
					day={day.day}
					currentDate={currentDate}
					isCurrentMonth={day.isCurrentMonth}
					baseYear={year}
					baseMonth={month}
					expenses={expenses}
					handleExpenseAdded={handleExpenseAdded}
				/>
			))}
		</div>
	);
};

export default CalendarGrid;
