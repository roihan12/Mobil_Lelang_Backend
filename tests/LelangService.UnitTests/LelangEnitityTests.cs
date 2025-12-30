using LelangService.Entities;

namespace LelangService.UnitTests;

public class LelangEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePricePriceGtZero_true()
    {
        //arrange
        var lelang = new Lelang
        {
            Id = Guid.NewGuid(),
            ReservePrice = 10
        };

        //act
        var result = lelang.HasReservePrice();

        //assert
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePricePriceIsZero_False()
    {
        //arrange
        var lelang = new Lelang
        {
            Id = Guid.NewGuid(),
            ReservePrice = 0
        };

        //act
        var result = lelang.HasReservePrice();

        //assert
        Assert.False(result);
    }
}
