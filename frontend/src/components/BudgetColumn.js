import "../css/BudgetColumn.css";

const BudgetColumn = () => {
  return (
    <div className="budgetcolumn-base">
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">
          Monthly Paycheck
        </div>
        <div className="budgetcolumn-tr budgetcolumn-figure">${}</div>
      </div>
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">Monthly Rent</div>
        <div className="budgetcolumn-tr budgetcolumn-figure">${}</div>
      </div>
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">
          Disposable Income
        </div>
        <div className="budgetcolumn-tr budgetcolumn-figure">${}</div>
      </div>
    </div>
  );
};

export default BudgetColumn;
