using LelangService.Entities;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace LelangService.Data
{
    public class LelangDbContext : DbContext
    {

        public LelangDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Lelang> lelangs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.AddInboxStateEntity();
            modelBuilder.AddOutboxMessageEntity();
            modelBuilder.AddOutboxStateEntity();
        }


    }
}
