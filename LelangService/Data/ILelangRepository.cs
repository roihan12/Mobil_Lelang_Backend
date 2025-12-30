using LelangService.DTOs;
using LelangService.Entities;

namespace LelangService.Data
{
    public interface ILelangRepository
    {
        Task<List<LelangDto>> GetLelangAsync(string date);
        Task<LelangDto> GetLelangByIdAsync(Guid id);

        Task<Lelang> GetLelangEntityById(Guid id);

        void AddLelang(Lelang lelang);

        void RemoveLelang(Lelang lelang);

        Task<bool> SaveChangesAsync();
    }
}
