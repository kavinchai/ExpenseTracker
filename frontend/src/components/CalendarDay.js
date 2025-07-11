import React from "react";
import "../css/CalendarDay.css";

const CalendarDay = ({ day, isCurrentMonth }) => (
  <div className={`calendar-day ${isCurrentMonth ? "" : "dimmed"}`}>
    {day}
  </div>
);

export default CalendarDay;