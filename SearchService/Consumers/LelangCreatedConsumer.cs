using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class LelangCreatedConsumer : IConsumer<LelangCreated>
    {
        private readonly IMapper _mapper;

        public LelangCreatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<LelangCreated> context)
        {
            Console.WriteLine("--> Consuming lelang created: " + context.Message.Id);

            var item = _mapper.Map<Item>(context.Message);

            if (item.Model == "foo") throw new ArgumentException("Cannot sell cars  with name foo");


            await item.SaveAsync();
        }
    }
}
