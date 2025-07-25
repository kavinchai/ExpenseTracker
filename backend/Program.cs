using ExpenseTracker.Models;
using ExpenseTracker.Data;
using Supabase;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container  

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ExpenseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
var apiKey = Environment.GetEnvironmentVariable("SUPABASE_API_KEY");

var supabase = new Supabase.Client(url, apiKey);
await supabase.InitializeAsync();


builder.Services.AddSingleton(supabase);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
