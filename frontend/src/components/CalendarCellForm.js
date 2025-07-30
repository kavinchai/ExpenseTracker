import { useState } from "react";
import { expenseService } from "../services/expenseService";
import { ReactComponent as TrashIcon } from "../assets/icons/icon-trash.svg";
import "../css/CalendarCellForm.css";

const CalendarCellForm = ({
  closeCalendarCellForm,
  cellDate,
  expensesForDay,
  dailyTotal,
  handleExpenseChanges,
}) => {
  const [editingExpense, setEditingExpense] = useState(null); // { id, field, value }
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
  });

  const handleAddExpense = () => {
    setIsAddingExpense(true);
  };

  const handleCancelAdd = () => {
    setIsAddingExpense(false);
    setNewExpense({ category: "", amount: "" });
  };

  const handleSaveExpense = async () => {
    if (!newExpense.category.trim() || !newExpense.amount.trim()) {
      alert("Please fill in both category and amount");
      return;
    }

    try {
      const expenseData = {
        Category: newExpense.category.trim(),
        Amount: parseFloat(newExpense.amount),
        EpochDate: cellDate.getTime(),
      };

      const savedExpense = await expenseService.createExpense(expenseData);
      console.log("Expense saved:", savedExpense);

      // Reset form
      setIsAddingExpense(false);
      setNewExpense({ category: "", amount: "" });

      // Call the callback to refresh parent data
      if (handleExpenseChanges) {
        handleExpenseChanges(savedExpense);
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expenseService.deleteExpense(expenseId);
      console.log("Expense deleted:", expenseId);

      // Refresh the expenses for the day
      if (handleExpenseChanges) {
        handleExpenseChanges();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setNewExpense((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Start editing an expense field
  const startEditingExpense = (expense, field) => {
    setEditingExpense({
      id: expense.Id,
      field: field,
      value:
        field === "category" ? expense.Category : expense.Amount.toString(),
    });
  };

  // Handle changes to the editing input
  const handleEditingChange = (value) => {
    setEditingExpense((prev) => ({
      ...prev,
      value: value,
    }));
  };

  // Save the edited expense
  const saveEditedExpense = async () => {
    if (!editingExpense) return;

    const expense = expensesForDay.find((exp) => exp.Id === editingExpense.id);
    if (!expense) return;

    try {
      const updatedExpenseData = {
        Category:
          editingExpense.field === "category"
            ? editingExpense.value.trim()
            : expense.Category,
        Amount:
          editingExpense.field === "amount"
            ? parseFloat(editingExpense.value)
            : expense.Amount,
        Date: expense.Date,
        EpochDate: expense.EpochDate,
      };

      // Validate the input
      if (editingExpense.field === "category" && !updatedExpenseData.Category) {
        alert("Category cannot be empty");
        return;
      }
      if (
        editingExpense.field === "amount" &&
        (isNaN(updatedExpenseData.Amount) || updatedExpenseData.Amount <= 0)
      ) {
        alert("Please enter a valid amount");
        return;
      }

      console.log("Updating expense with data:", updatedExpenseData);
      await expenseService.updateExpense(editingExpense.id, updatedExpenseData);
      console.log("Expense updated successfully");

      // Clear editing state
      setEditingExpense(null);

      // Refresh the expenses
      if (handleExpenseChanges) {
        handleExpenseChanges();
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      console.error("Error details:", error.message);
      alert(`Failed to update expense: ${error.message}`);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingExpense(null);
  };

  // Handle key press events
  const handleEditingKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEditedExpense();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
    }
  };

  const handleEditingBlur = () => {
    saveEditedExpense();
  };

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
        <div
          className="calendarcellform-base"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="calendarcellform-body">
            {/* Existing expenses */}
            {expensesForDay.map((expense) => (
              <div className="calendarcellform-tr" key={expense.Id}>
                <div className="calendarcellform-td expense-category">
                  {editingExpense?.id === expense.Id &&
                  editingExpense?.field === "category" ? (
                    <input
                      type="text"
                      value={editingExpense.value}
                      onChange={(e) => handleEditingChange(e.target.value)}
                      onKeyDown={handleEditingKeyPress}
                      onBlur={handleEditingBlur}
                      className="calendarcellform-input"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => startEditingExpense(expense, "category")}
                    >
                      {expense.Category}
                    </span>
                  )}
                </div>
                <div className="calendarcellform-td expense-amount">
                  {editingExpense?.id === expense.Id &&
                  editingExpense?.field === "amount" ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editingExpense.value}
                      onChange={(e) => handleEditingChange(e.target.value)}
                      onKeyDown={handleEditingKeyPress}
                      onBlur={handleEditingBlur}
                      className="calendarcellform-input"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => startEditingExpense(expense, "amount")}
                    >
                      ${expense.Amount.toFixed(2)}
                    </span>
                  )}
                  <TrashIcon
                    className="delete-expense"
                    onClick={() => handleDeleteExpense(expense.Id)}
                  />
                </div>
              </div>
            ))}

            {/* New expense row when adding */}
            {isAddingExpense && (
              <div className="calendarcellform-tr calendarcellform-tr-new">
                <div className="calendarcellform-td">
                  <input
                    type="text"
                    placeholder="Category"
                    value={newExpense.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="calendarcellform-input"
                    autoFocus
                  />
                </div>
                <div className="calendarcellform-td">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    className="calendarcellform-input"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="calendarcellform-footer">
            {dailyTotal !== 0 ? `Total: $${dailyTotal}` : ""}
          </div>
        </div>

        {/* Button controls */}
        <div className="calendarcellform-buttons">
          {!isAddingExpense ? (
            <button
              type="button"
              onClick={handleAddExpense}
              className="calendarcellform-btn"
            >
              Add Expense
            </button>
          ) : (
            <div className="calendarcellform-add-controls">
              <button
                type="button"
                onClick={handleSaveExpense}
                className="calendarcellform-btn calendarcellform-btn-save"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelAdd}
                className="calendarcellform-btn calendarcellform-btn-cancel"
              >
                Cancel
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={closeCalendarCellForm}
            className="calendarcellform-btn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarCellForm;
