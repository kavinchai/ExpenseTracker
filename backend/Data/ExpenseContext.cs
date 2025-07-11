using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Models;
namespace ExpenseTracker.Data
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> options) : base(options) { }
        public DbSet<Expense> Expenses => Set<Expense>();
    }
}
