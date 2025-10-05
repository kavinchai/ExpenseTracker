using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Models;
using ExpenseTracker.Mappers;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ExpenseTracker.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly Client _supabase;

        public ExpensesController(Client supabase)
        {
            _supabase = supabase;
        }

        [HttpGet("{year:int}/{month:int}")]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses(int year, int month)
        {
            try
            {
                // Calculate start and end dates for the month
                var startDate = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
                var endDate = startDate.AddMonths(1);

                // Convert to epoch timestamps
                var startEpoch = ((DateTimeOffset)startDate).ToUnixTimeMilliseconds();
                var endEpoch = ((DateTimeOffset)endDate).ToUnixTimeMilliseconds();

                // Query Supabase with date range
                var response = await _supabase
                    .From<Expense>()
                    .Filter("EpochDate", Operator.GreaterThanOrEqual, startEpoch.ToString())
                    .Filter("EpochDate", Operator.LessThan, endEpoch.ToString())
                    .Get();

                return Ok(response.Models.Select(ExpenseMapper.ModelToDto));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching expenses: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense(ExpenseDto expenseDto)
        {
            DateTime expenseDate;
            long epochTime;

            if (expenseDto.EpochDate > 0)
            {
                expenseDate = DateTimeOffset.FromUnixTimeMilliseconds(expenseDto.EpochDate).DateTime;
                epochTime = expenseDto.EpochDate;
            }
            else
            {
                expenseDate = DateTime.UtcNow;
                epochTime = ((DateTimeOffset)expenseDate).ToUnixTimeMilliseconds();
            }

            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                Category = expenseDto.Category,
                Amount = expenseDto.Amount,
                Date = expenseDate,
                EpochDate = epochTime
            };

            var response = await _supabase.From<Expense>().Insert(expense);
            var insertedExpense = response.Models.FirstOrDefault();
            if (insertedExpense == null)
            {
                return StatusCode(500, "Failed to create expense");
            }
            return CreatedAtAction(nameof(GetExpenses), new { id = insertedExpense?.Id }, ExpenseMapper.ModelToDto(insertedExpense));
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id){
            var existing = await _supabase
                            .From<Expense>()
                            .Filter("Id", Operator.Equals, id.ToString())
                            .Get();

            if (existing.Models.Count == 0)
            {
                return NotFound();
            }

            await _supabase
                .From<Expense>()
                .Filter("Id", Operator.Equals, id.ToString())
                .Delete();

            return NoContent();
        }
    }
}
