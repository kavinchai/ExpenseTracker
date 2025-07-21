import { useState } from "react";
import "../css/CalendarCellForm.css";

const CalendarCellForm = ({
  closeCalendarCellForm,
  cellDate,
  expensesForDay,
  getDailyTotal,
}) => {
  const [editCategory, setEditCategory] = useState(false);
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
          <div className="calendarcellform-body">
            {expensesForDay.map((expense) => (
              <div className="calendarcellform-tr" key={expense.Id}>
                <div
                  className="calendarcellform-td expense-category"
                  onClick={() => setEditCategory((prev) => !prev)}
                >
                  {editCategory === false ? expense.Category : <div>Test</div>}
                </div>
                <div className="calendarcellform-td">
                  ${expense.Amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="calendarcellform-footer">
            {getDailyTotal() !== 0 ? `Total: $${getDailyTotal()}` : ""}
          </div>
        </form>
        <button
          type="button"
          onClick={closeCalendarCellForm}
          className="calendarcellform-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarCellForm;
