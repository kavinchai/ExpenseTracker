using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Models;
using ExpenseTracker.Mappers;
using Supabase;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly Client _supabase;

        public ExpensesController(Client supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses()
        {
            var response = await _supabase.From<Expense>().Get();

            return Ok(response.Models.Select(ExpenseMapper.ModelToDto));
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense(ExpenseDto expenseDto)
        {
            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                Description = expenseDto.Description,
                Amount = expenseDto.Amount,
                Category = expenseDto.Category,
                Date = expenseDto.Date,
                EpochDate = expenseDto.EpochDate
            };

            var response = await _supabase.From<Expense>().Insert(expense);
            var insertedExpense = response.Models.FirstOrDefault();
            return CreatedAtAction(nameof(GetExpenses), new { id = insertedExpense?.Id }, expenseDto);
        }
    }
}
