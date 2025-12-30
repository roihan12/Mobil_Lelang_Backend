using AutoMapper;
using Contracts;
using LelangService.Data;
using LelangService.DTOs;
using LelangService.Entities;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LelangService.Controllers
{
    [Route("api/auctions")]
    [ApiController]
    public class LelangsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private IPublishEndpoint _publishEndpoint;
        private ILelangRepository _repo;

        public LelangsController(ILelangRepository repo, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _repo = repo;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<LelangDto>>> GetAllLelang(string date)
        {
            return await _repo.GetLelangAsync(date);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LelangDto>> GetLelangById(Guid id)
        {
            var lelang = await _repo.GetLelangByIdAsync(id);
            if (lelang == null)
            {
                return NotFound();
            }
            return lelang;
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



            _repo.AddLelang(lelang);

            var newLelang = _mapper.Map<LelangDto>(lelang);

            await _publishEndpoint.Publish(_mapper.Map<LelangCreated>(newLelang));

            var result = await _repo.SaveChangesAsync();



            if (!result)
            {
                return BadRequest("Could not create lelang");
            }

            return CreatedAtAction(nameof(GetLelangById), new { id = lelang.Id }, newLelang);
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<LelangDto>> UpdateLelang(Guid id, UpdateLelangDto lelangDto)
        {
            var lelang = await _repo.GetLelangEntityById(id);
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

            var result = await _repo.SaveChangesAsync();

            if (result) return Ok();

            return BadRequest("Could not update lelang");

        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLelang(Guid id)
        {
            var lelang = await _repo.GetLelangEntityById(id);
            if (lelang == null)
            {
                return NotFound();
            }

            if (lelang.Seller != User.Identity.Name)
            {
                return Forbid();
            }

            _repo.RemoveLelang(lelang);

            await _publishEndpoint.Publish<LelangDeleted>(new
            {
                Id = lelang.Id.ToString()
            });

            var result = await _repo.SaveChangesAsync();
            if (result) return Ok();
            return BadRequest("Could not delete lelang");
        }
    }
}
