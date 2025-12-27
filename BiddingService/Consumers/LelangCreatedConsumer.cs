using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Consumers
{
    public class LelangCreatedConsumer : IConsumer<LelangCreated>
    {

        public async Task Consume(ConsumeContext<LelangCreated> context)
        {
            var lelang = new Lelang
            {
                ID = context.Message.Id.ToString(),
                Seller = context.Message.Seller,
                EndedAt = context.Message.EndedAt,
                ReservePrice = context.Message.ReservePrice,
            };

            await lelang.SaveAsync();
        }
    }
}
