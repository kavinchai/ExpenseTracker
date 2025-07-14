import React from "react";
import "../css/CalendarCell.css";

const CalendarCell = ({ day, isCurrentMonth, expenses }) => {
  console.log(expenses);
  return (
    <div className={`calendarday ${isCurrentMonth ? "" : "calendarday-dimmed"}`}>
      <div className="calendarday-header">{day}</div>
      <div className="calendarday-body">
        <ul>
          {expenses.map((expense) => (
            <li key={expense.Id}>{expense.Description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarCell;