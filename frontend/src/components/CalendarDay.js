import React from "react";
import "../css/CalendarDay.css";

const CalendarDay = ({ day, isCurrentMonth, onClick }) => (
  <div
    className={`calendar-day ${isCurrentMonth ? "" : "dimmed"}`}
    onClick={() => isCurrentMonth && onClick?.(day)}
  >
    {day}
  </div>
);

export default CalendarDay;