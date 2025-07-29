import { useState } from "react";
import { expenseService } from "../services/expenseService";
import "../css/CalendarCellForm.css";

const CalendarCellForm = ({
	closeCalendarCellForm,
	cellDate,
	expensesForDay,
	getDailyTotal,
	handleExpenseAdded,
}) => {
	const [editCategory, setEditCategory] = useState(false);
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
			if (handleExpenseAdded) {
				handleExpenseAdded(savedExpense);
			}
		} catch (error) {
			console.error("Error saving expense:", error);
		}
	};

	const handleInputChange = (field, value) => {
		setNewExpense((prev) => ({
			...prev,
			[field]: value,
		}));
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
				<form className="calendarcellform-base">
					<div className="calendarcellform-body">
						{/* Existing expenses */}
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
										step="0.01"
										min="0"
									/>
								</div>
							</div>
						)}
					</div>
					<div className="calendarcellform-footer">
						{getDailyTotal() !== 0 ? `Total: $${getDailyTotal()}` : ""}
					</div>
				</form>

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
