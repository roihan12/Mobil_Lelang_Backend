using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers
{
    public class LelangFinishedConsumer : IConsumer<LelangFinished>
    {

        private readonly IHubContext<NotificationHub> _hubContext;
        public LelangFinishedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<LelangFinished> context)
        {
            Console.WriteLine("Consume ==> lelang  finished message received ");

            await _hubContext.Clients.All.SendAsync("LelangFinished", context.Message);
        }
    }
}
