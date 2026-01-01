using Contracts;
using LelangService.Data;
using LelangService.DTOs;
using LelangService.IntegrationTests.Fixtures;
using LelangService.IntegrationTests.Utils;
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;

namespace LelangService.IntegrationTests
{
    [Collection("Shared collection")]
    public class LelangBusTests : IAsyncLifetime
    {
        private readonly CustomWebAppFactory _facotry;
        private readonly HttpClient _httpClient;
        private ITestHarness _testHarness;

        public LelangBusTests(CustomWebAppFactory factory)
        {
            _facotry = factory;
            _httpClient = factory.CreateClient();
            _testHarness = factory.Services.GetTestHarness();
        }

        [Fact]
        public async Task CreateLelang_WithValidObject_ShouldPublishLelangCreated()
        {
            //arrange
            var lelang = GetLelangForCreate();
            _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

            var response = await _httpClient.PostAsJsonAsync($"api/auctions", lelang);

            //assert
            response.EnsureSuccessStatusCode();
            Assert.True(await _testHarness.Published.Any<LelangCreated>());
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
