using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using LelangService.Data;
using LelangService.DTOs;
using LelangService.Entities;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
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
        private IPublishEndpoint _publishEndpoint;

        public LelangsController(LelangDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<LelangDto>>> GetLelangs(string date)
        {
            var query = _context.lelangs.OrderBy(x => x.Item.Make).AsQueryable();

            if (!string.IsNullOrEmpty(date))
            {

                query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);

            }



            return await query.ProjectTo<LelangDto>(_mapper.ConfigurationProvider).ToListAsync();
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<LelangDto>> CreateLelang(CreateLelangDto lelangDto)
        {
            var lelang = _mapper.Map<Lelang>(lelangDto);
            lelang.Id = Guid.NewGuid();
            lelang.Seller = User.Identity.Name;
            lelang.CreatedAt = DateTime.UtcNow;
            lelang.UpdatedAt = DateTime.UtcNow;



            _context.lelangs.Add(lelang);

            var newLelang = _mapper.Map<LelangDto>(lelang);

            await _publishEndpoint.Publish(_mapper.Map<LelangCreated>(newLelang));

            var result = await _context.SaveChangesAsync() > 0;



            if (!result)
            {
                return BadRequest("Could not create lelang");
            }

            return CreatedAtAction(nameof(GetLelang), new { id = lelang.Id }, newLelang);
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<LelangDto>> UpdateLelang(Guid id, UpdateLelangDto lelangDto)
        {
            var lelang = await _context.lelangs.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
            if (lelang == null)
            {
                return NotFound();
            }

            if (lelang.Seller != User.Identity.Name)
            {
                return Forbid();
            }

            lelang.Item.Make = lelangDto.Make ?? lelang.Item.Make;
            lelang.Item.Model = lelangDto.Model ?? lelang.Item.Model;
            lelang.Item.Year = lelangDto.Year ?? lelang.Item.Year;
            lelang.Item.Color = lelangDto.Color ?? lelang.Item.Color;
            lelang.Item.Milage = lelangDto.Milage ?? lelang.Item.Milage;

            await _publishEndpoint.Publish(_mapper.Map<LelangUpdated>(lelang));

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Could not update lelang");

        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLelang(Guid id)
        {
            var lelang = await _context.lelangs.FindAsync(id);
            if (lelang == null)
            {
                return NotFound();
            }

            if (lelang.Seller != User.Identity.Name)
            {
                return Forbid();
            }

            _context.lelangs.Remove(lelang);

            await _publishEndpoint.Publish<LelangDeleted>(new
            {
                Id = lelang.Id.ToString()
            });

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest("Could not delete lelang");
        }
    }
}
