import "../css/CalendarCellForm.css";

const CalendarCellForm = ({
  closeCalendarCellForm,
  cellDate,
  expensesForDay,
}) => {
  return (
    <div className="calendarcell-overlay" onClick={closeCalendarCellForm}>
      <div
        className="calendarcell-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          {cellDate.toLocaleString("default", { month: "long" })}{" "}
          {cellDate.getDate()} {cellDate.getFullYear()}
        </h3>
        <form className="calendarcellform-base">
          {expensesForDay.map((expense) => (
            <div className="calendarcellform-tr" key={expense.Id}>
              <div className="calendarcellform-td expense-category">
                {expense.Category}
              </div>
              <div className="calendarcellform-td">
                ${expense.Amount.toFixed(2)}
              </div>
            </div>
          ))}
        </form>
        <button type="button" onClick={closeCalendarCellForm}>
          Close
        </button>
        {}
      </div>
    </div>
  );
};

export default CalendarCellForm;
