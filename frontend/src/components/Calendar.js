import React, { useState } from "react";
import { useCalendar } from "../hooks/useCalendar";
import { useExpenses } from "../hooks/useExpenses";
import CalendarGrid from "./CalendarGrid";
import "../css/Calendar.css";

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = useCalendar(year, month);
  const expenses = useExpenses();

  return (
    <div className="calendar-base">
      <div className="calendar-head">
        <h2>{currentDate.toLocaleString("default", { month: "long" })} {year}</h2>
      </div>
      <div className="calendar-body">
        <CalendarGrid days={days} expenses={expenses} />
      </div>
    </div>
  );
};

export default Calendar;