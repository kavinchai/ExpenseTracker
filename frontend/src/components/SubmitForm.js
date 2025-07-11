import react, {useState} from 'react';
import "../css/SubmitForm.css";

const SubmitForm = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString(),
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const expense = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date
        };

        try {
            const response = await fetch("https://localhost:7012/api/Expenses",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(expense)
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Expense saved:", data);
            setFormData({
                description: "",
                amount: "",
                category: "",
                date: ""
            });

        } catch (error) {
            console.error("Error submitting expense: ", error);
        }
    }

    return (
        <form className="submitform-base" onSubmit={handleSubmit}>
            <label>
                Description:
                <input 
                    type="text" 
                    name="description" 
                    onChange={handleChange}
                />
            </label>
            <label>
                Amount:
                <input 
                    type="text" 
                    name="amount" 
                    onChange={handleChange}
                />
            </label>
            <label>
                Category:
                <input 
                    type="text" 
                    name="category" 
                    onChange={handleChange}
                />
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default SubmitForm;