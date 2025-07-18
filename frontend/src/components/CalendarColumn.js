import "../css/CalendarColumn.css";

const CalendarColumn = ({ currentDate, budgetData, expenses }) => {
  const getMonthlyTotal = () => {
    return expenses
      .filter((expense) => {
        const date = new Date(expense.EpochDate);
        return (
          date.getMonth() === currentDate.getMonth() && // JS months are 0-based (0 = Jan)
          date.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((total, expense) => total + parseFloat(expense.Amount), 0);
  };
  return (
    <div className="calendarcolumn-base">
      <div className="calendarcolumn-tblock">
        <div className="calendarcolumn-tr calendarcolumn-title">
          Monthly Total
        </div>
        <div className="calendarcolumn-tr calendarcolumn-figure">
          ${getMonthlyTotal()}
        </div>
      </div>
      <div
        className={`calendarcolumn-tblock ${
          getMonthlyTotal() > budgetData.disposable_income
            ? "calendarcolumn-neg"
            : "calendarcolumn-pos"
        }`}
      >
        <div className="calendarcolumn-tr calendarcolumn-title">
          Monthly Saved
        </div>
        <div className="calendarcolumn-tr calendarcolumn-figure">
          ${budgetData.disposable_income - getMonthlyTotal()}
        </div>
      </div>
    </div>
  );
};

export default CalendarColumn;
