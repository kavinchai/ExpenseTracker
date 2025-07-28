import { useState } from "react";
import "../css/CalendarCell.css";
import CalendarCellForm from "./CalendarCellForm";

const CalendarCell = ({
  day,
  currentDate,
  isCurrentMonth,
  baseYear,
  baseMonth,
  expenses,
}) => {
  const cellDate = new Date(baseYear, baseMonth, day);

  if (!isCurrentMonth) {
    if (day < 15) {
      cellDate.setMonth(baseMonth + 1);
    } else {
      cellDate.setMonth(baseMonth - 1);
    }
  }
  const cellYear = cellDate.getFullYear();
  const cellMonth = cellDate.getMonth();
  const cellDay = cellDate.getDate();

  const expensesForDay = expenses.filter((expense) => {
    const expenseDate = new Date(expense.EpochDate);
    return (
      expenseDate.getFullYear() === cellYear &&
      expenseDate.getMonth() === cellMonth &&
      expenseDate.getDate() === cellDay
    );
  });

  const getDailyTotal = () => {
    return expensesForDay.reduce(
      (total, expense) => total + parseFloat(expense.Amount),
      0
    );
  };

  const [showCalendarCellForm, setShowCalendarCellForm] = useState(false);
  const openCalendarCellForm = () => setShowCalendarCellForm(true);
  const closeCalendarCellForm = () => setShowCalendarCellForm(false);

  return (
    <div
      className={`calendarcell-base ${
        isCurrentMonth ? "" : "calendarcell-dimmed"
      }`}
      onClick={openCalendarCellForm}
    >
      <div className="calendarcell-header">{day}</div>
      <div className="calendarcell-body">
        {expensesForDay.map((expense) => (
          <div className="calendarcell-tr" key={expense.Id}>
            <div className="calendarcell-td expense-category">
              {expense.Category}
            </div>
            <div className="calendarcell-td expense-amount">
              ${expense.Amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="calendarcell-footer">
        {getDailyTotal() !== 0 ? `$${getDailyTotal().toFixed(2)}` : ""}
      </div>
      {showCalendarCellForm && (
        <CalendarCellForm
          closeCalendarCellForm={closeCalendarCellForm}
          cellDate={cellDate}
          expensesForDay={expensesForDay}
          getDailyTotal={getDailyTotal}
        />
      )}
    </div>
  );
};

export default CalendarCell;
