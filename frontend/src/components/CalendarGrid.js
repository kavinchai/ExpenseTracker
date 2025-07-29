import CalendarCell from "./CalendarCell";
import "../css/CalendarGrid.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ days, month, year, expenses, refreshExpenses }) => {
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
          isCurrentMonth={day.isCurrentMonth}
          baseYear={year}
          baseMonth={month}
          expenses={expenses}
          refreshExpenses={refreshExpenses}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
