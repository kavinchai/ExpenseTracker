import { dateUtils } from "../utils/dateUtils";

export const useCalendar = (year, month) => {
	const days = [];

	const daysInMonth = dateUtils.getDaysInMonth(year, month);
	const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);

	// Leading days from previous month
	const prevMonth = month === 0 ? 11 : month - 1;
	const prevYear = month === 0 ? year - 1 : year;
	const daysInPrevMonth = dateUtils.getDaysInMonth(prevYear, prevMonth);

	for (let i = firstDayOfMonth - 1; i >= 0; i--) {
		days.push({
			day: daysInPrevMonth - i,
			isCurrentMonth: false,
		});
	}

	// Current month days
	for (let i = 1; i <= daysInMonth; i++) {
		days.push({
			day: i,
			isCurrentMonth: true,
		});
	}

	// Trailing days from next month
	let trailingDay = 1;
	const totalCells = 42; // 6 weeks x 7 days
	for (let i = days.length; i < totalCells; i++) {
		days.push({
			day: trailingDay++,
			isCurrentMonth: false,
		});
	}

	return days;
};
