using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class LelangFinishedConsumer : IConsumer<LelangFinished>
    {
        public async Task Consume(ConsumeContext<LelangFinished> context)
        {
            Console.WriteLine(" Consuming LelangFinished event: " + context.Message.LelangId);

            var lelang = await DB.Find<Item>().OneAsync(context.Message.LelangId);

            if (context.Message.ItemSold)
            {
                lelang.Winner = context.Message.Winner;
                lelang.SoldAmount = (int)context.Message.Amount;
            }

            lelang.Status = "Finished";
            await lelang.SaveAsync();
        }
    }
}
