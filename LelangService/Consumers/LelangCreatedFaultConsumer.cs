using Contracts;
using MassTransit;

namespace LelangService.Consumers
{
    public class LelangCreatedFaultConsumer : IConsumer<Fault<LelangCreated>>
    {
        public async Task Consume(ConsumeContext<Fault<LelangCreated>> context)
        {
            Console.WriteLine("--> Lelang Created Fault Consumer ");

            var exceptions = context.Message.Exceptions.First();

            if (exceptions.ExceptionType == "System.ArgumentException")
            {
                context.Message.Message.Model = "Foobar";
                await context.Publish(context.Message.Message);
            }
            else
            {
                Console.WriteLine("Not an Argument exception - update");
            }
        }
    }
}
