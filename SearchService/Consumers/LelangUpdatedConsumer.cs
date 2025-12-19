using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class LelangUpdatedConsumer : IConsumer<LelangUpdated>
    {

        private readonly IMapper _mapper;

        public LelangUpdatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<LelangUpdated> context)
        {
            Console.WriteLine("--> Consuming lelang updated: " + context.Message.Id);

            var item = _mapper.Map<Item>(context.Message);

            var result = await DB.Update<Item>()
                .MatchID(item.ID)
                .ModifyOnly(i => new { i.Make, i.Model, i.Color, i.Year, i.Milage }, item)
                 .ExecuteAsync();
            if (!result.IsAcknowledged)
                throw new MessageException(typeof(LelangUpdated), "Problem updating on mongodb");

        }
    }
}
