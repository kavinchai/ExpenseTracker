using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;
namespace ExpenseTracker.Models
{
    [Table("Expense")]
    public class Expense : BaseModel
    {
        [PrimaryKey("Id")]
        public Guid Id { get; set; }
        public string? Category { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public long EpochDate { get; set; }
    }
}
