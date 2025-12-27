using Contracts;
using LelangService.Data;
using MassTransit;

namespace LelangService.Consumers
{
    public class LelangFinishedConsumer : IConsumer<LelangFinished>
    {

        private readonly LelangDbContext _context;
        public LelangFinishedConsumer(LelangDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<LelangFinished> context)
        {
            Console.WriteLine("Consuming lelang finished, " + context.Message.LelangId);

            var lelang = await _context.lelangs.FindAsync(Guid.Parse(context.Message.LelangId));

            if (context.Message.ItemSold)
            {
                lelang.Winner = context.Message.Winner;
                lelang.SoldAmount = context.Message.Amount;
            }

            lelang.Status = lelang.SoldAmount > lelang.ReservePrice ? Entities.Status.Finished : Entities.Status.ReserveNotMet;

            await _context.SaveChangesAsync();
        }
    }
}
