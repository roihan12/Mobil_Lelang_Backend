using AutoFixture;
using AutoMapper;
using LelangService.Controllers;
using LelangService.Data;
using LelangService.DTOs;
using LelangService.Entities;
using LelangService.RequestHelpers;
using LelangService.UnitTests.Utils;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace LelangService.UnitTests
{
    public class LelangControllerTests
    {
        private readonly Mock<ILelangRepository> _lelangRepo;
        private readonly Mock<IPublishEndpoint> _publishEndpoint;
        private readonly Fixture _fixture;
        private readonly LelangsController _controller;
        private readonly IMapper _mapper;
        public LelangControllerTests()
        {
            _fixture = new Fixture();
            _lelangRepo = new Mock<ILelangRepository>();
            _publishEndpoint = new Mock<IPublishEndpoint>();

            var mockMapper = new MapperConfiguration(mc =>
            {
                mc.AddMaps(typeof(MappingProfiles).Assembly);
            }).CreateMapper().ConfigurationProvider;

            _mapper = new Mapper(mockMapper);

            _controller = new LelangsController(_lelangRepo.Object, _mapper, _publishEndpoint.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext { User = Helpers.GetClaimsPrincipals() }
                }
            };

        }

        [Fact]
        public async Task GetAllLelang_WithNoParams_Returns10Lelang()
        {
            //arrange
            var lelang = _fixture.CreateMany<LelangDto>(10).ToList();

            _lelangRepo.Setup(repo => repo.GetLelangAsync(null)).ReturnsAsync(lelang);

            //act
            var result = await _controller.GetAllLelang(null);

            //assert
            Assert.Equal(10, result.Value.Count);
            Assert.IsType<ActionResult<List<LelangDto>>>(result);
        }


        [Fact]
        public async Task GetLelangById_WithValidGuid_ReturnsLelang()
        {
            //arrange
            var lelang = _fixture.Create<LelangDto>();

            _lelangRepo.Setup(repo => repo.GetLelangByIdAsync(It.IsAny<Guid>())).ReturnsAsync(lelang);

            //act
            var result = await _controller.GetLelangById(lelang.Id);

            //assert
            Assert.Equal(lelang.Make, result.Value.Make);
            Assert.IsType<ActionResult<LelangDto>>(result);
        }


        [Fact]
        public async Task GetLelangById_WithInValidGuid_ReturnsNotFound()
        {


            _lelangRepo.Setup(repo => repo.GetLelangByIdAsync(It.IsAny<Guid>())).ReturnsAsync(value: null);

            //act
            var result = await _controller.GetLelangById(Guid.NewGuid());

            //assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateLelang_WithInValidLelangDto_ReturnsCreatedAtAction()
        {
            //arrange
            var lelang = _fixture.Create<CreateLelangDto>();


            _lelangRepo.Setup(repo => repo.AddLelang(It.IsAny<Lelang>()));
            _lelangRepo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

            //act
            var result = await _controller.CreateLelang(lelang);
            var createdResult = result.Result as CreatedAtActionResult;

            //assert
            Assert.NotNull(createdResult);
            Assert.Equal("GetLelangById", createdResult.ActionName);
            Assert.IsType<LelangDto>(createdResult.Value);
        }

        [Fact]
        public async Task CreateLelang_FailedSave_Returns400BadRequest()
        {
            var lelangDto = _fixture.Create<CreateLelangDto>();
            _lelangRepo.Setup(repo => repo.AddLelang(It.IsAny<Lelang>()));
            _lelangRepo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(false);

            var result = await _controller.CreateLelang(lelangDto);

            Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Fact]
        public async Task UpdateLelang_WithUpdateLelangDto_ReturnsOkResponse()
        {
            //arrange
            var lelang = _fixture.Build<Lelang>().Without(x => x.Item).Create();
            lelang.Item = _fixture.Build<Item>().Without(x => x.Lelang).Create();
            lelang.Seller = "test";

            var updateLelangDto = _fixture.Create<UpdateLelangDto>();

            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(lelang);
            _lelangRepo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

            //act
            var result = await _controller.UpdateLelang(lelang.Id, updateLelangDto);

            //assert
            Assert.IsType<OkResult>(result.Result);
        }

        [Fact]
        public async Task UpdateLelang_WithInvalidUser_Returns403Forbid()
        {
            //arrange
            var lelang = _fixture.Build<Lelang>().Without(x => x.Item).Create();
            lelang.Seller = "not-test";

            var updateLelangDto = _fixture.Create<UpdateLelangDto>();

            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(lelang);

            //act
            var result = await _controller.UpdateLelang(lelang.Id, updateLelangDto);

            //assert
            Assert.IsType<ForbidResult>(result.Result);
        }

        [Fact]
        public async Task UpdateLelang_WithInvalidGuid_ReturnsNotFound()
        {
            //arrange
            var updateLelangDto = _fixture.Create<UpdateLelangDto>();

            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(value: null);

            //act
            var result = await _controller.UpdateLelang(Guid.NewGuid(), updateLelangDto);

            //assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task DeleteLelang_WithValidUser_ReturnsOkResponse()
        {
            //arrange
            var lelang = _fixture.Build<Lelang>().Without(x => x.Item).Create();
            lelang.Seller = "test";

            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(lelang);
            _lelangRepo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

            //act
            var result = await _controller.DeleteLelang(lelang.Id);

            //assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task DeleteLelang_WithInvalidGuid_Returns404Response()
        {
            //arrange
            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(value: null);

            //act
            var result = await _controller.DeleteLelang(Guid.NewGuid());

            //assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteLelang_WithInvalidUser_Returns403Response()
        {
            var lelang = _fixture.Build<Lelang>().Without(x => x.Item).Create();
            lelang.Seller = "not_test";


            _lelangRepo.Setup(repo => repo.GetLelangEntityById(It.IsAny<Guid>())).ReturnsAsync(lelang);

            //act
            var result = await _controller.DeleteLelang(lelang.Id);

            //assert
            Assert.IsType<ForbidResult>(result);
        }

    }
}
