using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine(" Consuming BidPlaced event: " + context.Message.Id);

            var lelang = await DB.Find<Item>().OneAsync(context.Message.LelangId);


            if (context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > lelang.CurrentHighBid)
            {
                lelang.CurrentHighBid = context.Message.Amount;
                await lelang.SaveAsync();
            }

        }
    }
}
