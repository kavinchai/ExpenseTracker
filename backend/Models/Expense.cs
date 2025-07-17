using Supabase.Postgrest.Models;

namespace ExpenseTracker.Models
{
    public class Expense : BaseModel
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public string? Category { get; set; }
        public DateTime Date { get; set; }
        public long EpochDate { get; set; }
    }
}
