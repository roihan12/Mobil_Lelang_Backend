# 🚗 Mobil Lelang Backend

Sistem backend untuk platform lelang mobil online yang dibangun menggunakan arsitektur microservices dengan .NET 8 dan Next.js untuk frontend.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Arsitektur](#arsitektur)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi & Setup](#instalasi--setup)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Layanan Microservices](#layanan-microservices)
- [Testing](#testing)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)

## 🎯 Tentang Proyek

**Mobil Lelang Backend** adalah platform lelang mobil online yang memungkinkan pengguna untuk:
- Membuat dan mengelola lelang mobil
- Melakukan bidding secara real-time
- Mencari dan memfilter lelang yang tersedia
- Menerima notifikasi tentang lelang dan bid
- Autentikasi dan otorisasi pengguna yang aman

Proyek ini dibangun dengan arsitektur microservices untuk memastikan skalabilitas, maintainability, dan kemudahan deployment.

## 🏗️ Arsitektur

Sistem ini menggunakan arsitektur microservices dengan komponen-komponen berikut:

```
┌─────────────────┐
│   Web App       │ ← Next.js Frontend (Port 3000)
│   (Next.js)     │
└────────┬────────┘
         │
┌────────▼────────┐
│  Nginx Proxy    │ ← Reverse Proxy
└────────┬────────┘
         │
┌────────▼────────┐
│ Gateway Service │ ← API Gateway (Yarp)
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┬───────────┬─────────────┐
    │         │          │          │           │             │
┌───▼───┐ ┌──▼──┐  ┌────▼────┐ ┌──▼──────┐ ┌──▼─────┐  ┌───▼──────┐
│Lelang │ │Bid  │  │Search   │ │Identity │ │Notify  │  │Contracts │
│Service│ │Svc  │  │Service  │ │Service  │ │Service │  │ (Shared) │
└───┬───┘ └──┬──┘  └────┬────┘ └────┬────┘ └───┬────┘  └──────────┘
    │        │          │           │          │
    └────────┴──────────┴───────────┴──────────┘
                        │
            ┌───────────┼───────────┐
            │           │           │
      ┌─────▼──┐   ┌───▼────┐  ┌──▼─────┐
      │Postgres│   │MongoDB │  │RabbitMQ│
      └────────┘   └────────┘  └────────┘
```

### Komponen Utama:

1. **Frontend (Next.js)** - Aplikasi web client-side
2. **API Gateway** - Single entry point untuk semua microservices
3. **Identity Service** - Autentikasi dan otorisasi dengan Duende IdentityServer
4. **Lelang Service** - Manajemen lelang mobil (CRUD operations)
5. **Bidding Service** - Pengelolaan bid real-time dengan SignalR
6. **Search Service** - Pencarian dan filtering lelang
7. **Notification Service** - Sistem notifikasi event-driven
8. **Contracts** - Shared library untuk event messaging

### Infrastruktur:

- **PostgreSQL** - Database untuk Identity & Lelang Service
- **MongoDB** - Database untuk Search & Bidding Service
- **RabbitMQ** - Message broker untuk event-driven communication
- **Nginx Proxy** - Reverse proxy untuk routing and SSL

## 🛠️ Tech Stack

### Backend
- **.NET 8** - Framework utama
- **ASP.NET Core** - Web API
- **Entity Framework Core** - ORM untuk PostgreSQL
- **MongoDB Driver** - Database driver untuk MongoDB
- **Duende IdentityServer** - OAuth 2.0 & OpenID Connect
- **MassTransit** - Message bus abstraction
- **RabbitMQ** - Message broker
- **gRPC** - Inter-service communication
- **SignalR** - Real-time bidding
- **AutoMapper** - Object mapping
- **xUnit** - Unit & Integration testing

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **NextAuth.js** - Authentication
- **TailwindCSS** - Styling
- **SignalR Client** - Real-time updates
- **React Hook Form** - Form management
- **Zustand** - State management

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Local development orchestration
- **Kubernetes** - Production orchestration (K8S manifests available)
- **Nginx** - Reverse proxy

## 📦 Prasyarat

Pastikan Anda telah menginstall tools berikut:

- **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** - Runtime untuk backend services
- **[Node.js 20+](https://nodejs.org/)** - Runtime untuk frontend
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)** - Untuk menjalankan containers
- **[Git](https://git-scm.com/)** - Version control
- **Visual Studio 2022** atau **VS Code** (optional, recommended)

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/roihan12/Mobil_Lelang_Backend.git
cd Mobil_Lelang_Backend
```

### 2. Setup Hosts File (Opsional, untuk development)

Tambahkan entries berikut ke file hosts Anda untuk local development:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`  
**Mac/Linux:** `/etc/hosts`

```
127.0.0.1 id.lemobil.local
127.0.0.1 app.lemobil.local
127.0.0.1 api.lemobil.local
```

### 3. Generate Development Certificates (Opsional)

Untuk HTTPS lokal, generate self-signed certificates:

```bash
# Di folder devcerts/
# Sudah tersedia certificate untuk development
```

### 4. Setup Environment Variables

Konfigurasi sudah tersedia di `docker-compose.yml`, tapi Anda bisa menyesuaikan:

- Database credentials
- RabbitMQ settings
- Service URLs
- JWT secrets

## 🎯 Menjalankan Aplikasi

### Opsi 1: Docker Compose (Recommended untuk development)

Cara termudah untuk menjalankan seluruh sistem:

```bash
# Build dan start semua services
docker-compose up -d

# Atau rebuild jika ada perubahan code
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Stop semua services
docker-compose down

# Stop dan hapus volumes (reset database)
docker-compose down -v
```

Setelah running, akses:
- **Frontend:** http://localhost:3000
- **Identity Server:** http://localhost (via nginx)
- **API Gateway:** http://localhost (via nginx)
- **RabbitMQ Management:** http://localhost:15672 (user: guest, pass: guest)

### Opsi 2: Running Individual Services (Development)

#### Backend Services

```bash
# Terminal 1 - Run Infrastructure
docker-compose up -d postgres mongodb rabbitmq

# Terminal 2 - Identity Service
cd IdentityService
dotnet run

# Terminal 3 - Lelang Service
cd LelangService
dotnet run

# Terminal 4 - Search Service
cd SearchService
dotnet run

# Terminal 5 - Bidding Service
cd BiddingService
dotnet run

# Terminal 6 - Notification Service
cd NotificationService
dotnet run

# Terminal 7 - Gateway Service
cd GatewayService
dotnet run
```

#### Frontend

```bash
cd frontend/web-app
npm install
npm run dev
```

## 🔧 Layanan Microservices

### 1. Identity Service
**Port:** Managed by nginx proxy  
**Database:** PostgreSQL  
**Fungsi:**
- Autentikasi pengguna (login, register)
- OAuth 2.0 & OpenID Connect provider
- JWT token generation & validation
- User management

**Endpoints:**
- `/connect/authorize` - OAuth authorization
- `/connect/token` - Token generation
- `/account/register` - User registration
- `/account/login` - User login

### 2. Lelang Service
**Port:** 7001 (HTTP), 7777 (gRPC)  
**Database:** PostgreSQL  
**Fungsi:**
- CRUD operations untuk lelang mobil
- Manajemen data mobil (make, model, year, mileage, dll)
- Publish events ke RabbitMQ (lelang created, updated, deleted)
- gRPC service untuk inter-service communication

**API Endpoints:**
- `GET /api/lelangs` - List semua lelang
- `GET /api/lelangs/{id}` - Detail lelang
- `POST /api/lelangs` - Create lelang baru
- `PUT /api/lelangs/{id}` - Update lelang
- `DELETE /api/lelangs/{id}` - Delete lelang

### 3. Search Service
**Port:** 7002  
**Database:** MongoDB  
**Fungsi:**
- Search dan filtering lelang
- Sync data dari Lelang Service via RabbitMQ events
- High-performance read operations
- Support untuk filtering by make, model, year, price range

**API Endpoints:**
- `GET /api/search` - Search lelang dengan filters
- Query params: `searchTerm`, `make`, `model`, `year`, `orderBy`, `pageSize`

### 4. Bidding Service
**Port:** 7003  
**Database:** MongoDB  
**Fungsi:**
- Manajemen bid untuk lelang
- Real-time bidding dengan SignalR
- Validasi bid (amount, timing, authentication)
- Tracking bid history

**API Endpoints:**
- `GET /api/bids/{lelangId}` - List bids untuk lelang
- `POST /api/bids` - Place a new bid
- **SignalR Hub:** `/notifications` - Real-time bid updates

### 5. Notification Service
**Port:** 7004  
**Fungsi:**
- Consumer untuk RabbitMQ events
- Broadcast notifications via SignalR
- Event processing (LelangCreated, BidPlaced, LelangFinished)
- Push notifications ke connected clients

**SignalR Hub:** `/notifications`

### 6. Gateway Service
**Port:** Managed by nginx  
**Fungsi:**
- Reverse proxy untuk semua backend services
- Request routing
- Authentication middleware
- Load balancing (future)

**Routes:**
- `/api/lelangs/*` → Lelang Service
- `/api/search/*` → Search Service
- `/api/bids/*` → Bidding Service

### 7. Web App (Frontend)
**Port:** 3000  
**Fungsi:**
- User interface untuk platform lelang
- Server-side rendering dengan Next.js
- Authentication dengan NextAuth.js
- Real-time updates dengan SignalR

**Pages:**
- `/` - Homepage dengan list lelang
- `/lelangs/[id]` - Detail lelang dengan bidding
- `/lelangs/create` - Form create lelang
- `/lelangs/update/[id]` - Form update lelang
- `/session` - User session info

## 🧪 Testing

Proyek ini memiliki unit tests dan integration tests untuk memastikan kualitas code.

### Structure Tests:
```
tests/
├── LelangService.UnitTests/           # Unit tests untuk Lelang Service
├── LelangService.IntegrationTests/    # Integration tests untuk Lelang Service
└── SearchService.IntegrationTests/    # Integration tests untuk Search Service
```

### Menjalankan Tests:

```bash
# Run semua tests
dotnet test

# Run tests untuk specific project
dotnet test tests/LelangService.UnitTests/
dotnet test tests/LelangService.IntegrationTests/

# Run dengan code coverage
dotnet test /p:CollectCoverage=true
```

### Unit Tests
- Testing business logic
- Mocking dependencies
- Fast execution

### Integration Tests
- Testing dengan real database (PostgreSQL/MongoDB in containers)
- End-to-end API testing
- Testing message publishing ke RabbitMQ

## 🚢 Deployment

### Docker Images

Build individual service images:

```bash
# Lelang Service
docker build -t lelang-service:latest -f LelangService/Dockerfile .

# Search Service
docker build -t search-service:latest -f SearchService/Dockerfile .

# Identity Service
docker build -t identity-service:latest -f IdentityService/Dockerfile .

# Gateway Service
docker build -t gateway-service:latest -f GatewayService/Dockerfile .

# Bidding Service
docker build -t bid-service:latest -f BiddingService/Dockerfile .

# Notification Service
docker build -t notify-service:latest -f NotificationService/Dockerfile .

# Frontend
docker build -t web-app:latest -f frontend/web-app/Dockerfile .
```

### Kubernetes Deployment

Kubernetes manifests tersedia di folder `infra/K8S/`:

```bash
# Apply semua manifests
kubectl apply -f infra/K8S/

# Atau apply individual services
kubectl apply -f infra/K8S/postgres-depl.yml
kubectl apply -f infra/K8S/mongodb-depl.yml
kubectl apply -f infra/K8S/rabbitmq-depl.yml
kubectl apply -f infra/K8S/lelang-depl.yml
# ... dst
```

**Kubernetes Resources:**
- Deployments untuk setiap service
- Services untuk networking
- ConfigMaps untuk configuration
- Secrets untuk sensitive data
- Ingress untuk external access

### Production Considerations

1. **Environment Variables:**
   - Gunakan Kubernetes Secrets untuk credentials
   - Configure proper database connections
   - Set production URLs

2. **Scaling:**
   - Scale microservices dengan `kubectl scale`
   - Configure horizontal pod autoscaling
   - Database replication untuk high availability

3. **Monitoring:**
   - Implement logging (Serilog, ELK stack)
   - Add health checks
   - Configure metrics (Prometheus)

4. **Security:**
   - Use proper SSL certificates
   - Configure CORS policies
   - Implement rate limiting
   - Regular security updates

## 📁 Struktur Proyek

```
Mobil_Lelang_Backend/
├── BiddingService/          # Bidding microservice
├── Contracts/               # Shared event contracts
├── GatewayService/          # API Gateway
├── IdentityService/         # Authentication & Authorization
├── LelangService/          # Lelang microservice
├── NotificationService/     # Notification microservice
├── SearchService/          # Search microservice
├── frontend/
│   └── web-app/            # Next.js frontend
├── tests/
│   ├── LelangService.UnitTests/
│   ├── LelangService.IntegrationTests/
│   └── SearchService.IntegrationTests/
├── infra/
│   ├── K8S/                # Kubernetes manifests
│   ├── devcerts/           # Development certificates
│   └── ingress/            # Ingress configurations
├── docker-compose.yml       # Development orchestration
└── Mobil_Lelang_Backend.sln # Visual Studio solution
```

## 🔑 Default Credentials

### Development Environment:

**PostgreSQL:**
- Host: localhost:5431
- User: postgres
- Password: mypassword
- Databases: lelangs, identity

**MongoDB:**
- Host: localhost:27018
- User: root
- Password: mongopw

**RabbitMQ:**
- Management UI: http://localhost:15672
- User: guest
- Password: guest

**Test Users:** (seeded by Identity Service)
- alice@test.com / Pass123$
- bob@test.com / Pass123$

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Guidelines:
- Follow C# coding conventions
- Write unit tests untuk business logic baru
- Update documentation jika diperlukan
- Ensure all tests pass sebelum submit PR

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 👨‍💻 Author

**Roihan Sori**
- GitHub: [@roihan12](https://github.com/roihan12)

## 🙏 Acknowledgments

- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [Duende IdentityServer](https://duendesoftware.com/products/identityserver)
- [MassTransit](https://masstransit-project.com/)
- [Next.js](https://nextjs.org/)

## 📞 Support

Jika Anda memiliki pertanyaan atau menemukan bug, silakan buka issue di GitHub repository.

---

**Happy Coding! 🚀**
