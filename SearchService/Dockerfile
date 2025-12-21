FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build  
WORKDIR /app

COPY Mobil_Lelang_Backend.sln ./
COPY SearchService/SearchService.csproj ./src/SearchService/
COPY Contracts/Contracts.csproj ./src/Contracts/

RUN dotnet restore ./src/SearchService/SearchService.csproj

COPY . .
RUN dotnet publish ./SearchService/SearchService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SearchService.dll"]
