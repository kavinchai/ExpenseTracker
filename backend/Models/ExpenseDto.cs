namespace ExpenseTracker.Models
{
    public class ExpenseDto
    {
        public Guid Id { get; set; }
        public string? Category { get; set; }

        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public long EpochDate { get; set; }
    }
}
