FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build  
WORKDIR /app
EXPOSE 80

COPY Mobil_Lelang_Backend.sln Mobil_Lelang_Backend.sln
COPY LelangService/LelangService.csproj ./src/LelangService/
COPY SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY Contracts/Contracts.csproj ./src/Contracts/
COPY tests/LelangService.UnitTests/LelangService.UnitTests.csproj tests/LelangService.UnitTests/LelangService.UnitTests.csproj
COPY tests/LelangService.IntegrationTests/LelangService.IntegrationTests.csproj tests/LelangService.IntegrationTests/LelangService.IntegrationTests.csproj
COPY tests/SearchService.IntegrationTests/SearchService.IntegrationTests.csproj tests/SearchService.IntegrationTests/SearchService.IntegrationTests.csproj


RUN dotnet restore Mobil_Lelang_Backend.sln

# Copy the app folders over
COPY LelangService src/LelangService
COPY Contracts src/Contracts
WORKDIR /app/src/LelangService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "LelangService.dll"]
