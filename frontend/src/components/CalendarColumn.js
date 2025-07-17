import "../css/CalendarColumn.css";

const CalendarColumn = ({currentDate, expenses}) => {
    const getMonthlyTotal = (expenses, month, year) => {
        return expenses.filter(expense => {
            const date = new Date(expense.Date);
                return (
                    date.getMonth() === month && // JS months are 0-based (0 = Jan)
                    date.getFullYear() === year
                );
        }).reduce((total, expense) => total + parseFloat(expense.Amount), 0);
    };
    return(
        <div className="calendarcolumn-base">
            <div className="calendarcolumn-tblock">
                <div className="calendarcolumn-tr">
                    Monthly Total
                    
                </div>
                <div className="calendarcolumn-tr">
                    {getMonthlyTotal(expenses, currentDate.getMonth(), currentDate.getFullYear())}
                </div>
            </div>
            <div className="calendarcolumn-tblock">
                <div className="calendarcolumn-tr">
                    Monthly Total
                </div>
                <div className="calendarcolumn-tr">
                    {getMonthlyTotal(expenses, currentDate.getMonth(), currentDate.getFullYear())}
                </div>
            </div>
        </div>
    )
}

export default CalendarColumn;