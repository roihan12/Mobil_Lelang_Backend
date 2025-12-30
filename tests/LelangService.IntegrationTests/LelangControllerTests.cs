using LelangService.Data;
using LelangService.DTOs;
using LelangService.IntegrationTests.Fixtures;
using LelangService.IntegrationTests.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;

namespace LelangService.IntegrationTests
{
    public class LelangControllerTests : IClassFixture<CustomWebAppFactory>, IAsyncLifetime
    {

        private readonly CustomWebAppFactory _facotry;
        private readonly HttpClient _httpClient;

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

        public Task InitializeAsync() => Task.CompletedTask;

        public Task DisposeAsync()
        {
            using var scope = _facotry.Services.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<LelangDbContext>();
            DbHelper.ReInitDbForTests(db);
            return Task.CompletedTask;
        }
    }
}
