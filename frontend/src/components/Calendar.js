import { useState } from "react";
import { useCalendar } from "../hooks/useCalendar";
import { useExpenses } from "../hooks/useExpenses";
import CalendarGrid from "./CalendarGrid";
import CalendarColumn from "./CalendarColumn";
import BudgetColumn from "./BudgetColumn";
import budgetJson from "../data/budget.json";
import "../css/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = useCalendar(year, month);
  const { expenses, refreshExpenses } = useExpenses();
  const budgetData = budgetJson.data;

  const changeMonth = (offset) => {
    setCurrentDate((curr) => {
      const newDate = new Date(curr);
      newDate.setMonth(curr.getMonth() + offset);
      return newDate;
    });
  };

  return (
    <div className="calendar-base">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={() => changeMonth(-1)}>
          {"<"}
        </button>
        <h2 className="calendar-month">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
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
          currentDate={currentDate}
          budgetData={budgetData}
          expenses={expenses}
        />
      </div>
    </div>
  );
};

export default Calendar;
