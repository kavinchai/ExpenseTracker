import { useState } from "react";
import "../css/SubmitForm.css";

const SubmitForm = () => {
	const [formData, setFormData] = useState({
		category: "",
		amount: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const expense = {
			category: formData.category,
			amount: parseFloat(formData.amount),
			date: new Date().toISOString(),
			epochDate: Math.floor(new Date().getTime()),
		};

		try {
			const response = await fetch("https://localhost:7012/api/Expenses", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(expense),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Expense saved: ", data);
			setFormData({
				category: "",
				amount: "",
			});
		} catch (error) {
			console.error("Error submitting expense: ", error);
		}
	};

	return (
		<form
			className="submitform-base"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<label className="submitform-group">
				Category:
				<input
					type="text"
					name="category"
					value={formData.category || ""}
					onChange={handleChange}
				/>
			</label>
			<label className="submitform-group">
				Amount:
				<input
					type="text"
					name="amount"
					value={formData.amount || ""}
					onChange={handleChange}
				/>
			</label>
			<label className="submitform-group">
				<input type="submit" value="Submit" />
			</label>
		</form>
	);
};

export default SubmitForm;
