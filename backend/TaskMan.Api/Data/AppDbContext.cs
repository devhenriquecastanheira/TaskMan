using Microsoft.EntityFrameworkCore;
using TaskMan.Api.Models;

namespace TaskMan.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks { get; set; }
}