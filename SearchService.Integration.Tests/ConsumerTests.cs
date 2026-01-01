using AutoFixture;
using Contracts;
using MassTransit.Testing;
using MongoDB.Entities;
using SearchService.Consumers;
using SearchService.Models;

namespace SearchService.Integration.Tests
{
    public class ConsumerTests : IClassFixture<CustomWebAppFactory>
    {
        private readonly ITestHarness _testHarness;
        private readonly Fixture _fixture;

        public ConsumerTests(CustomWebAppFactory factory)
        {
            _testHarness = factory.Services.GetTestHarness();
            _fixture = new Fixture();
        }

        [Fact]
        public async Task AuctionCreated_ShouldCreateItemInDb()
        {
            // arrange
            var consumerHarness = _testHarness.GetConsumerHarness<LelangCreatedConsumer>();
            var auction = _fixture.Create<LelangCreated>();

            // act
            await _testHarness.Bus.Publish(auction);

            // assert
            Assert.True(await consumerHarness.Consumed.Any<LelangCreated>());
            var item = await DB.Find<Item>().OneAsync(auction.Id.ToString());
            Assert.Equal(auction.Make, item?.Make);
        }
    }
}
