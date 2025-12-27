
using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    public class CheckLelangFinished : BackgroundService
    {
        private readonly ILogger _logger;
        private readonly IServiceProvider _services;
        public CheckLelangFinished(ILogger<CheckLelangFinished> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for finished lelang");

            stoppingToken.Register(() => _logger.LogInformation("==> Lelang check is stopping"));

            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckLelang(stoppingToken);

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task CheckLelang(CancellationToken stoppingToken)
        {
            var finishedLelang = await DB.Find<Lelang>().Match(x => x.EndedAt <= DateTime.UtcNow).Match(x => !x.Finished).ExecuteAsync(stoppingToken);



            if (finishedLelang.Count == 0) return;

            _logger.LogInformation("==> Found {count} lelang that have completed", finishedLelang.Count);

            using var scope = _services.CreateScope();

            var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach (var lelang in finishedLelang)
            {
                lelang.Finished = true;
                await lelang.SaveAsync(null, stoppingToken);

                var winningBid = await DB.Find<Bid>().Match(a => a.LelangId == lelang.ID).Match(b => b.BidStatus == BidStatus.Accepted)
                    .Sort(x => x.Descending(s => s.Amount)).ExecuteFirstAsync(stoppingToken);

                await endpoint.Publish(new LelangFinished
                {
                    ItemSold = winningBid != null,
                    LelangId = lelang.ID,
                    Winner = winningBid?.Bidder,
                    Amount = winningBid?.Amount,
                    Seller = lelang.Seller

                }, stoppingToken);
            }
        }
    }

}