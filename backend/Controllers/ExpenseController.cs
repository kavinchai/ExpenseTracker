using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Models;
using ExpenseTracker.Mappers;
using Supabase;
using static Supabase.Postgrest.Constants;

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
            var currentDateTime = DateTime.UtcNow;
            var currentEpochTime = ((DateTimeOffset)currentDateTime).ToUnixTimeMilliseconds();

            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                Category = expenseDto.Category,
                Amount = expenseDto.Amount,
                Date = currentDateTime,
                EpochDate = currentEpochTime
            };

            var response = await _supabase.From<Expense>().Insert(expense);
            var insertedExpense = response.Models.FirstOrDefault();
            return CreatedAtAction(nameof(GetExpenses), new { id = insertedExpense?.Id }, expenseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(Guid id, [FromBody] ExpenseDto updatedExpense)
        {
            var existing = await _supabase
                            .From<Expense>()
                            .Filter("Id", Operator.Equals, id.ToString())
                            .Get();

            if (existing.Models.Count == 0)
            {
                return NotFound();
            }

            var expense = existing.Models[0];
            expense.Category = updatedExpense.Category;
            expense.Amount = updatedExpense.Amount;
            expense.Date = updatedExpense.Date;
            expense.EpochDate = updatedExpense.EpochDate;

            await _supabase.From<Expense>().Update(expense);

            return Ok(ExpenseMapper.ModelToDto(expense));
        }
    }
}
