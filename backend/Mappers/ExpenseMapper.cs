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
                Description = e.Description,
                Amount = e.Amount,
                Category = e.Category,
                Date = e.Date
            };
            return expenseDto;
        }

        public static Expense DtoToModel(ExpenseDto ed)
        {
            Expense expense = new Expense
            {
                Id = ed.Id,
                Description = ed.Description,
                Amount = ed.Amount,
                Category = ed.Category,
                Date = ed.Date
            };
            return expense;
        }
    }
}
