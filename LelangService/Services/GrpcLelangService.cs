using Grpc.Core;
using LelangService.Data;

namespace LelangService.Services
{
    public class GrpcLelangService : GrpcLelang.GrpcLelangBase
    {
        private readonly LelangDbContext _dbContext;

        public GrpcLelangService(LelangDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<GrpcLelangResponse> GetLelang(GetLelangRequest request, ServerCallContext context)
        {
            Console.WriteLine("==> Received grpc request for lelang");

            var lelang = await _dbContext.lelangs.FindAsync(Guid.Parse(request.Id));
            if (lelang == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Not found"));
            }

            var response = new GrpcLelangResponse
            {
                Lelang = new GrpcLelangModel
                {
                    EndedAt = lelang.EndedAt.ToString(),
                    Id = lelang.Id.ToString(),
                    ReservePrice = lelang.ReservePrice,
                    Seller = lelang.Seller
                }
            };

            return response;
        }

    }
}
