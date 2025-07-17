import "../css/CalendarCell.css";

const CalendarCell = ({ day, currentDate, isCurrentMonth, baseYear, baseMonth, expenses }) => {  
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

  const expensesForDay = expenses.filter(expense => {
    const expenseDate = new Date(expense.EpochDate);
    console.log(expenseDate);
    return (
      expenseDate.getFullYear() === cellYear &&
      expenseDate.getMonth() === cellMonth &&
      expenseDate.getDate() === cellDay
    );
  });

  const getDailyTotal = () => {
    return expensesForDay.reduce((total, expense) => total + parseFloat(expense.Amount), 0);
  };

  return (
    <div className={`calendarcell-base ${isCurrentMonth ? "" : "calendarcell-dimmed"}`}>
      <div className="calendarcell-header">{day}</div>
      <div className="calendarcell-body">
            {expensesForDay.map(expense => (
              <div  className="calendarcell-tr" key={expense.Id}>
                <div className="calendarcell-td expense-category">{expense.Category}</div>
                <div className="calendarcell-td">${expense.Amount.toFixed(2)}</div>
              </div>
            ))}
      </div>
      <div className="calendarcell-footer">{getDailyTotal() !== 0 ? `$${getDailyTotal().toFixed(2)}` : ""}</div>
    </div>
  );
};

export default CalendarCell;