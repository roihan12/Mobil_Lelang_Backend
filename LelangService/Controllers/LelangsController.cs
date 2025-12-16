using AutoMapper;
using LelangService.Data;
using LelangService.DTOs;
using LelangService.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LelangService.Controllers
{
    [Route("api/auctions")]
    [ApiController]
    public class LelangsController : ControllerBase
    {
        private readonly LelangDbContext _context;
        private readonly IMapper _mapper;

        public LelangsController(LelangDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<LelangDto>>> GetLelangs()
        {
            var lelangs = await _context.lelangs.Include(x => x.Item).OrderBy(x => x.Item.Make).ToListAsync();

            return _mapper.Map<List<LelangDto>>(lelangs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LelangDto>> GetLelang(Guid id)
        {
            var lelang = await _context.lelangs.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
            if (lelang == null)
            {
                return NotFound();
            }
            return _mapper.Map<LelangDto>(lelang);
        }

        [HttpPost]
        public async Task<ActionResult<LelangDto>> CreateLelang(CreateLelangDto lelangDto)
        {
            var lelang = _mapper.Map<Lelang>(lelangDto);
            lelang.Id = Guid.NewGuid();
            lelang.Seller = "TestSeller";
            lelang.CreatedAt = DateTime.UtcNow;
            lelang.UpdatedAt = DateTime.UtcNow;
            _context.lelangs.Add(lelang);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result)
            {
                return BadRequest("Could not create lelang");
            }

            var createdLelangDto = _mapper.Map<LelangDto>(lelang);
            return CreatedAtAction(nameof(GetLelang), new { id = lelang.Id }, createdLelangDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<LelangDto>> UpdateLelang(Guid id, UpdateLelangDto lelangDto)
        {
            var lelang = await _context.lelangs.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
            if (lelang == null)
            {
                return NotFound();
            }
            //TODO: check username == seller

            lelang.Item.Make = lelangDto.Make ?? lelang.Item.Make;
            lelang.Item.Model = lelangDto.Model ?? lelang.Item.Model;
            lelang.Item.Year = lelangDto.Year ?? lelang.Item.Year;
            lelang.Item.Color = lelangDto.Color ?? lelang.Item.Color;
            lelang.Item.Milage = lelangDto.Milage ?? lelang.Item.Milage;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Could not update lelang");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLelang(Guid id)
        {
            var lelang = await _context.lelangs.FindAsync(id);
            if (lelang == null)
            {
                return NotFound();
            }
            //TODO: check username == seller

            _context.lelangs.Remove(lelang);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest("Could not delete lelang");
        }
    }
}
