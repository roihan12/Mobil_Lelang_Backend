using Contracts;
using LelangService.Data;
using MassTransit;

namespace LelangService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly LelangDbContext _context;
        public BidPlacedConsumer(LelangDbContext context)
        {
            _context = context;

        }

        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("Consuming bid placed, " + context.Message.Id);

            var lelang = await _context.lelangs.FindAsync(context.Message.LelangId);

            if (lelang.CurrentHighBid == null || context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > lelang.CurrentHighBid)
            {
                lelang.CurrentHighBid = context.Message.Amount;
                await _context.SaveChangesAsync();
            }

        }
    }
}
