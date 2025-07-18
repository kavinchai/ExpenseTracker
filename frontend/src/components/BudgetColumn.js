import "../css/BudgetColumn.css";

const BudgetColumn = ({ budgetData }) => {
  return (
    <div className="budgetcolumn-base">
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">
          Monthly Paycheck
        </div>
        <div className="budgetcolumn-tr budgetcolumn-figure">
          ${budgetData.monthly_paycheck}
        </div>
      </div>
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">Monthly Rent</div>
        <div className="budgetcolumn-tr budgetcolumn-figure">
          ${budgetData.monthly_rent}
        </div>
      </div>
      <div className="budgetcolumn-tblock">
        <div className="budgetcolumn-tr budgetcolumn-title">
          Disposable Income
        </div>
        <div className="budgetcolumn-tr budgetcolumn-figure">
          ${budgetData.disposable_income}
        </div>
      </div>
    </div>
  );
};

export default BudgetColumn;
