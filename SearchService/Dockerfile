FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build  
WORKDIR /app
EXPOSE 80

COPY Mobil_Lelang_Backend.sln Mobil_Lelang_Backend.sln
COPY LelangService/LelangService.csproj LelangService/LelangService.csproj
COPY SearchService/SearchService.csproj SearchService/SearchService.csproj
COPY GatewayService/GatewayService.csproj GatewayService/GatewayService.csproj
COPY BiddingService/BiddingService.csproj BiddingService/BiddingService.csproj
COPY NotificationService/NotificationService.csproj NotificationService/NotificationService.csproj
COPY IdentityService/IdentityService.csproj IdentityService/IdentityService.csproj
COPY Contracts/Contracts.csproj Contracts/Contracts.csproj
COPY tests/LelangService.UnitTests/LelangService.UnitTests.csproj tests/LelangService.UnitTests/LelangService.UnitTests.csproj
COPY tests/LelangService.IntegrationTests/LelangService.IntegrationTests.csproj tests/LelangService.IntegrationTests/LelangService.IntegrationTests.csproj
COPY tests/SearchService.IntegrationTests/SearchService.IntegrationTests.csproj tests/SearchService.IntegrationTests/SearchService.IntegrationTests.csproj


RUN dotnet restore Mobil_Lelang_Backend.sln

# Copy the app folders over
COPY SearchService SearchService
COPY Contracts Contracts
WORKDIR /app/SearchService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "SearchService.dll"]
