using LelangService.Data;
using LelangService.IntegrationTests.Utils;
using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using WebMotions.Fake.Authentication.JwtBearer;

namespace LelangService.IntegrationTests.Fixtures
{
    public class CustomWebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        private PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();
        public async Task InitializeAsync()
        {
            await _postgreSqlContainer.StartAsync();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                services.RemoveDbContext<LelangDbContext>();

                services.AddDbContext<LelangDbContext>(options =>
                {
                    options.UseNpgsql(_postgreSqlContainer.GetConnectionString());
                });

                services.AddMassTransitTestHarness();

                services.EnsureCreated<LelangDbContext>();

                services.AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme).AddFakeJwtBearer(opt =>
                {
                    opt.BearerValueType = FakeJwtBearerBearerValueType.Jwt;
                });

            });
        }

        Task IAsyncLifetime.DisposeAsync() => _postgreSqlContainer.DisposeAsync().AsTask();

    }
}
