using AutoMapper;
using AutoMapper.QueryableExtensions;
using LelangService.DTOs;
using LelangService.Entities;
using Microsoft.EntityFrameworkCore;

namespace LelangService.Data
{
    public class LelangRepository : ILelangRepository
    {
        private readonly LelangDbContext _context;
        private readonly IMapper _mapper;

        public LelangRepository(LelangDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddLelang(Lelang lelang)
        {
            _context.lelangs.Add(lelang);
        }

        public async Task<List<LelangDto>> GetLelangAsync(string date)
        {
            var query = _context.lelangs.OrderBy(x => x.Item.Make).AsQueryable();

            if (!string.IsNullOrEmpty(date))
            {

                query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);

            }



            return await query.ProjectTo<LelangDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<LelangDto> GetLelangByIdAsync(Guid id)
        {
            return await _context.lelangs.ProjectTo<LelangDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Lelang> GetLelangEntityById(Guid id)
        {
            return await _context.lelangs.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);

        }

        public void RemoveLelang(Lelang lelang)
        {
            _context.lelangs.Remove(lelang);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
