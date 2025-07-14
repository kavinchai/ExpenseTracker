import React from "react";
import CalendarCell from "./CalendarCell";
import "../css/CalendarGrid.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ days, expenses }) => (
  <div className="calendargrid">
    {weekdays.map((day) => (
      <div key={day} className="calendargrid-days-in-week">{day}</div>
    ))}

    {days.map((day, idx) => (
      <CalendarCell key={idx} day={day.day} isCurrentMonth={day.isCurrentMonth} expenses={expenses} />
    ))}
  </div>
);

export default CalendarGrid;