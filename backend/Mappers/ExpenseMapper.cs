using ExpenseTracker.Models;

namespace ExpenseTracker.Mappers
{
    public static class ExpenseMapper
    {
        public static ExpenseDto ModelToDto(Expense? e)
        {
            if (e == null)
            {
                throw new ArgumentNullException(nameof(e), "Expense cannot be null");
            }

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

        public static Expense DtoToModel(ExpenseDto? ed)
        {
            if (ed == null)
            {
                throw new ArgumentNullException(nameof(ed), "ExpenseDto cannot be null");
            }
            
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
