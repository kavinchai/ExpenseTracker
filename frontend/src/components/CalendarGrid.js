import React from "react";
import CalendarDay from "./CalendarDay";
import "../css/CalendarGrid.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate(); // last day of current month
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
}

const CalendarGrid = ({ year, month, selectedDate, onDateClick }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = [];

  // Leading days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  // Trailing days from next month
  let trailingDay = 1;
  while (days.length < 35) {
    days.push({
      day: trailingDay++,
      isCurrentMonth: false,
    });
  }

  return (
    <div className="calendargrid">
      {/* Weekday labels */}
      {weekdays.map((weekday) => (
        <div key={weekday} className="calendargrid-days-in-week">
          {weekday}
        </div>
      ))}

      {/* Day cells */}
      {days.map((day, idx) => (
        <CalendarDay
          key={idx}
          day={day.day}
          isCurrentMonth={day.isCurrentMonth}
          onClick={onDateClick}
        >
          {day.day}
        </CalendarDay>
      ))}
    </div>
  );
}

export default CalendarGrid;
