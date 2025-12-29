using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers
{
    public class LelangCreatedConsumer : IConsumer<LelangCreated>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        public LelangCreatedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<LelangCreated> context)
        {
            Console.WriteLine("Consume ==> lelang create message received ");

            await _hubContext.Clients.All.SendAsync("LelangCreated", context.Message);


        }
    }
}
