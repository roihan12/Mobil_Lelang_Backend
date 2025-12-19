using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class LelangDeletedConsumer : IConsumer<LelangDeleted>
    {

        public async Task Consume(ConsumeContext<LelangDeleted> context)
        {
            Console.WriteLine("--> Consuming lelang deleted: " + context.Message.Id);

            var result = await DB.DeleteAsync<Item>(context.Message.Id);

            if (!result.IsAcknowledged)
                throw new MessageException(typeof(LelangDeleted), "Problem deleting on mongodb");
        }
    }
}
