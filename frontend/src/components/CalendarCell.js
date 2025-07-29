import { useState, useMemo } from "react";
import "../css/CalendarCell.css";
import CalendarCellForm from "./CalendarCellForm";
import { dateUtils } from "../utils/dateUtils";

const CalendarCell = ({
  day,
  isCurrentMonth,
  baseYear,
  baseMonth,
  expenses,
  refreshExpenses,
}) => {
  const [showCalendarCellForm, setShowCalendarCellForm] = useState(false);

  const cellDate = useMemo(
    () => dateUtils.calculateCellDate(day, isCurrentMonth, baseYear, baseMonth),
    [day, isCurrentMonth, baseYear, baseMonth]
  );

  const expensesForDay = useMemo(
    () => dateUtils.filterExpensesByDate(expenses, cellDate),
    [expenses, cellDate]
  );

  const dailyTotal = useMemo(
    () =>
      expensesForDay.reduce(
        (total, expense) => total + parseFloat(expense.Amount),
        0
      ),
    [expensesForDay]
  );

  const openCalendarCellForm = () => setShowCalendarCellForm(true);
  const closeCalendarCellForm = () => setShowCalendarCellForm(false);

  const handleExpenseChanges = async (newExpense) => {
    await refreshExpenses();
    if (newExpense) {
      console.log("Expenses refreshed after adding: ", newExpense);
    } else {
      console.log("Expenses refreshed after deletion");
    }
  };

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
        {dailyTotal !== 0 ? `$${dailyTotal.toFixed(2)}` : ""}
      </div>
      {showCalendarCellForm && (
        <CalendarCellForm
          closeCalendarCellForm={closeCalendarCellForm}
          cellDate={cellDate}
          expensesForDay={expensesForDay}
          dailyTotal={dailyTotal}
          handleExpenseChanges={handleExpenseChanges}
        />
      )}
    </div>
  );
};

export default CalendarCell;
