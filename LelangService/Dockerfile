FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build  
WORKDIR /app

COPY Mobil_Lelang_Backend.sln ./
COPY LelangService/LelangService.csproj ./src/LelangService/
COPY Contracts/Contracts.csproj ./src/Contracts/

RUN dotnet restore ./src/LelangService/LelangService.csproj

COPY . .
RUN dotnet publish ./LelangService/LelangService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "LelangService.dll"]
