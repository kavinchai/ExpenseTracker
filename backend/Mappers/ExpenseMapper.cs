using ExpenseTracker.Models;

namespace ExpenseTracker.Mappers
{
    public static class ExpenseMapper
    {
        public static ExpenseDto ModelToDto(Expense e)
        {
            ExpenseDto expenseDto = new ExpenseDto
            {
                Id = e.Id,
                Category = e.Category,
                Amount = e.Amount,
                Date = e.Date,
                EpochDate = e.EpochDate
            };
            return expenseDto;
        }

        public static Expense DtoToModel(ExpenseDto ed)
        {
            Expense expense = new Expense
            {
                Id = ed.Id,
                Category = ed.Category,
                Amount = ed.Amount,
                Date = ed.Date,
                EpochDate = ed.EpochDate
            };
            return expense;
        }
    }
}
