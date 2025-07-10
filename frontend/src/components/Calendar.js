// eslint-disable-next-line
import React, { useState } from "react";
import "../css/Calendar.css";
import CalendarGrid from "./CalendarGrid";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const handleDateClick = (day) => {
        alert(`You clicked: ${year}-${month + 1}-${day}`);
    };

    return (
        <div className="calendar-base">
            <div className="calendar-head">
                <h2>{currentDate.toLocaleString("default", { month: "long" })} {year}</h2>
            </div>
            <div className="calendar-body">
            <CalendarGrid
                year={year}
                month={month}
                onDateClick={handleDateClick}
            />
            </div>
            
            
        </div>
    );
}

export default Calendar;