using MongoDB.Entities;

namespace BiddingService.Models
{
    public class Lelang : Entity
    {
        public DateTime EndedAt { get; set; }
        public string Seller { get; set; }
        public int ReservePrice { get; set; }

        public bool Finished { get; set; }

    }
}
