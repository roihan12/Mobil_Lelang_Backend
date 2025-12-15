using LelangService.Entities;
using Microsoft.EntityFrameworkCore;

namespace LelangService.Data
{
    public class LelangDbContext : DbContext
    {

        public LelangDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Lelang> lelangs { get; set; }


    }
}
