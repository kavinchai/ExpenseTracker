import React from "react";
import "../css/CalendarCell.css";

const CalendarCell = ({ day, currentDate, isCurrentMonth, expenses }) => {
  const expensesForDay = expenses.filter(expense => {
    const expenseDate = new Date(expense.Date);
    return (
      expenseDate.getDate() === day &&
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });
  const getDailyTotal = (expenses, day, currentDate) => {
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.Date);
        return (
          expenseDate.getDate() === day &&
          expenseDate.getMonth() === currentDate.getMonth() &&
          expenseDate.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((total, expense) => total + parseFloat(expense.Amount), 0);
  };

  return (
    <div className={`calendarcell-base ${isCurrentMonth ? "" : "calendarcell-dimmed"}`}>
      <div className="calendarcell-header">{day}</div>
      <div className="calendarcell-body">
        <table>
          <thead>
            <tr>
              {/* <th>Category</th> */}
              {/* <th>Amount</th> */}
            </tr>
          </thead>
          <tbody>
              {expensesForDay.map((expense) => (
                <tr key={expense.Id}>
                  <td>{expense.Category}</td>
                  <td>${expense.Amount.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="calendarcell-footer">{getDailyTotal(expenses, day, currentDate)}</div>
    </div>
  );
};

export default CalendarCell;