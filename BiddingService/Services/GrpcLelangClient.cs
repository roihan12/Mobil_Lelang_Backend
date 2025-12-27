using BiddingService.Models;
using Grpc.Net.Client;
using LelangService;

namespace BiddingService.Services
{
    public class GrpcLelangClient
    {
        private readonly IConfiguration _config;
        private readonly ILogger<GrpcLelangClient> _logger;

        public GrpcLelangClient(ILogger<GrpcLelangClient> logger, IConfiguration config)
        {
            _config = config;
            _logger = logger;
        }

        public Lelang GetLelang(string id)
        {
            _logger.LogInformation("Calling GRPC Service");

            var channel = GrpcChannel.ForAddress(_config["GrpcLelang"]);
            var client = new GrpcLelang.GrpcLelangClient(channel);
            var request = new GetLelangRequest { Id = id };

            try
            {
                var reply = client.GetLelang(request);
                var lelang = new Lelang
                {
                    ID = reply.Lelang.Id,
                    EndedAt = DateTime.Parse(reply.Lelang.EndedAt),
                    Seller = reply.Lelang.Seller,
                    ReservePrice = reply.Lelang.ReservePrice,

                };

                return lelang;
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Could not call GRPC Server");
                return null;
            }
        }
    }
}
