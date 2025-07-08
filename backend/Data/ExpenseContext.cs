namespace ExpenseTracker.Data;

using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Models;

public class ExpenseContext : DbContext
{
    public ExpenseContext(DbContextOptions<ExpenseContext> options) : base(options) { }

    public DbSet<Expense> Expenses => Set<Expense>();
}
