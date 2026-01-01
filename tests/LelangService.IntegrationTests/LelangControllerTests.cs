using LelangService.Data;
using LelangService.DTOs;
using LelangService.IntegrationTests.Fixtures;
using LelangService.IntegrationTests.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;

namespace LelangService.IntegrationTests
{
    public class LelangControllerTests : IClassFixture<CustomWebAppFactory>, IAsyncLifetime
    {

        private readonly CustomWebAppFactory _facotry;
        private readonly HttpClient _httpClient;
        private const string GT_ID = "afbee524-5972-4075-8800-7d1f9d7b0a0c";

        public LelangControllerTests(CustomWebAppFactory factory)
        {
            _facotry = factory;
            _httpClient = factory.CreateClient();
        }

        [Fact]
        public async Task GetLelang_ShouldReturn3Lelang()
        {
            var response = await _httpClient.GetFromJsonAsync<List<LelangDto>>("api/auctions");

            Assert.Equal(3, response.Count);
        }

        [Fact]
        public async Task GetLelangById_WithValiId_ShouldReturnLelang()
        {


            var response = await _httpClient.GetFromJsonAsync<LelangDto>($"api/auctions/{GT_ID}");

            Assert.Equal("GT", response.Model);
        }

        [Fact]
        public async Task GetLelangById_WithInvalidId_ShouldReturn404()
        {


            var response = await _httpClient.GetAsync($"api/auctions/{Guid.NewGuid()}");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task GetLelangById_WithInvalidId_ShouldReturn400()
        {


            var response = await _httpClient.GetAsync($"api/auctions/notaguid");

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task CreateLelang_WithNoAuth_ShouldReturn401()
        {
            var lelang = new CreateLelangDto
            {
                Make = "test"
            };

            var response = await _httpClient.PostAsJsonAsync($"api/auctions", lelang);


            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }


        [Fact]
        public async Task CreateLelang_WithAuth_ShouldReturn201()
        {
            var lelang = GetLelangForCreate();

            _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

            var response = await _httpClient.PostAsJsonAsync($"api/auctions", lelang);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var createdLelang = await response.Content.ReadFromJsonAsync<LelangDto>();
            Assert.Equal("bob", createdLelang.Seller);
        }

        [Fact]
        public async Task CreateLelang_WithInvalidCreateLelangDto_ShouldReturn400()
        {
            // arrange
            var lelang = new CreateLelangDto
            {
                Make = "test"
            };
            _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

            // act

            var response = await _httpClient.PostAsJsonAsync($"api/auctions", lelang);

            // assert

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

        }

        [Fact]
        public async Task UpdateLelang_WithValidUpdateDtoAndUser_ShouldReturn200()
        {
            // arrange
            var updateLelang = new UpdateLelangDto { Make = "Updated" };
            _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

            // act
            var response = await _httpClient.PutAsJsonAsync($"api/auctions/{GT_ID}", updateLelang);
            // assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task UpdateLelang_WithValidUpdateDtoAndInvalidUser_ShouldReturn403()
        {
            // arrange 
            var updateLelang = new UpdateLelangDto { Make = "Updated" };
            _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("notbob"));

            // act
            var response = await _httpClient.PutAsJsonAsync($"api/auctions/{GT_ID}", updateLelang);

            // assert
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }



        public Task InitializeAsync() => Task.CompletedTask;

        public Task DisposeAsync()
        {
            using var scope = _facotry.Services.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<LelangDbContext>();
            DbHelper.ReInitDbForTests(db);
            return Task.CompletedTask;
        }

        private CreateLelangDto GetLelangForCreate()
        {
            return new CreateLelangDto
            {
                Make = "test",
                Model = "testModel",
                ImageUrl = "Test",
                Color = "test",
                Milage = 10,
                Year = 10,
                ReservePrice = 10,
            };
        }
    }
}
