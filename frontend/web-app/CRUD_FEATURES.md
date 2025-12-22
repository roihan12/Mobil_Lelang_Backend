# CRUD & Search Feature Documentation

## Overview

Halaman Mobil Lelang dengan fitur CRUD lengkap (Create, Read, Update, Delete) dan Search/Filter yang powerful.

## Fitur Utama

### 1. **Search Feature** 🔍

- Pencarian real-time untuk make, model, dan tahun mobil
- Search dilakukan saat user mengetik
- Integration dengan API backend

### 2. **Filter Feature** 📊

- **Year Range**: Filter mobil berdasarkan tahun minimum dan maksimum
- **Price Range**: Filter berdasarkan harga minimum dan maksimum
- **Condition**: Filter berdasarkan kondisi mobil (Excellent, Good, Fair, Poor)
- **Multiple Filters**: Bisa menggabungkan beberapa filter sekaligus
- **Filter Counter**: Menampilkan jumlah filter aktif
- **Reset Filters**: Tombol untuk mengembalikan semua filter ke default

### 3. **CRUD Operations**

#### **Create (Tambah Mobil)**

- Modal form untuk menambah mobil baru
- Form validation untuk field required (Make, Model, Year, Price)
- Field-field:
  - Make (Required)
  - Model (Required)
  - Year (Required, 1900-current year + 1)
  - Price (Required, > 0)
  - Mileage (Optional)
  - Condition (Optional, dropdown)
  - Description (Optional)
  - Image URL (Optional)

#### **Read (Lihat Mobil)**

- Grid view dengan responsive layout
- Card design untuk setiap mobil dengan:
  - Gambar mobil dengan hover zoom effect
  - Condition badge
  - Make, Model, dan Year
  - Harga
  - Mileage
  - Short description
  - Action buttons (Edit, Delete)
- Empty state dengan CTA untuk tambah mobil pertama
- Loading state dengan spinner

#### **Update (Edit Mobil)**

- Modal form sama dengan Create
- Pre-filled dengan data mobil saat diedit
- Validasi form yang sama
- Save button dengan loading state

#### **Delete (Hapus Mobil)**

- Confirmation dialog sebelum delete
- Loading state pada button saat delete
- Auto-refresh list setelah delete

### 4. **User Feedback**

- Success message setelah Create/Update/Delete
- Error message jika ada kesalahan
- Loading indicators
- Empty state messages

## File Structure

```
app/
├── lib/
│   ├── api.ts                 # API calls (fetchCars, createCar, updateCar, deleteCar)
│   └── utils.ts               # Utility functions
├── components/
│   ├── CarFormModal.tsx        # Modal form untuk Create/Edit
│   ├── CarCard.tsx             # Card component untuk display mobil
│   ├── SearchFilter.tsx        # Search & Filter component
│   └── NavBar.tsx              # Navigation bar
└── auctions/
    └── page.tsx                # Main listings page
```

## Component Details

### CarFormModal Component

- Props:
  - `isOpen`: Boolean untuk kontrol modal visibility
  - `onClose`: Callback saat modal ditutup
  - `onSubmit`: Callback untuk submit form
  - `initialData`: Data untuk edit mode (optional)
  - `title`: Title modal
  - `isLoading`: Loading state

### CarCard Component

- Props:
  - `car`: Car object untuk ditampilkan
  - `onEdit`: Callback untuk edit
  - `onDelete`: Callback untuk delete
  - `isDeleting`: Loading state saat delete

### SearchFilter Component

- Props:
  - `onSearch`: Callback untuk search
  - `onFilterChange`: Callback untuk filter changes
  - `isLoading`: Loading state

## API Endpoints (Expected)

```
GET    /search              # Fetch cars dengan optional search & filters
GET    /cars/:id            # Fetch single car
POST   /cars                # Create car
PUT    /cars/:id            # Update car
DELETE /cars/:id            # Delete car
```

## Query Parameters

```
GET /search?search=toyota&minYear=2000&maxYear=2024&minPrice=5000&maxPrice=50000&condition=good
```

## Styling

- **Color Scheme**: Sky Blue (sky-400 to sky-500) + Blue gradient
- **Responsive**: Mobile-first approach dengan Tailwind CSS
- **Icons**: React Icons (FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiLoader, FiX)
- **Images**: Next.js Image component untuk optimization

## Future Enhancements

- [ ] Pagination untuk list yang besar
- [ ] Sorting (by price, year, mileage)
- [ ] Advanced filters (color, body type, fuel type)
- [ ] Image upload instead of URL
- [ ] Car details view modal
- [ ] Favorites/Wishlist feature
- [ ] Export to CSV/PDF
- [ ] Bulk operations
- [ ] Auction bidding feature

## How to Use

### View Listings

1. Navigate ke `/auctions` page
2. Semua mobil akan ditampilkan dalam grid

### Search

1. Ketik di search input
2. Hasil akan auto-filter saat mengetik

### Filter

1. Click tombol "Filter"
2. Set filter criteria (year, price, condition)
3. Click "Reset Filters" untuk clear semua

### Add Car

1. Click tombol "Tambah Mobil"
2. Fill form fields
3. Click "Save Car"

### Edit Car

1. Click "Edit" button di card
2. Update data
3. Click "Save Car"

### Delete Car

1. Click "Delete" button di card
2. Confirm dalam dialog
3. Mobil akan dihapus dan list di-refresh

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

Pastikan backend URL di `app/lib/api.ts` sesuai dengan backend server:

```typescript
const API_URL = "http://localhost:6001";
```

## Notes

- Semua field validation dilakukan di frontend
- Loading states untuk mencegah double submission
- Error handling untuk API failures
- Responsive design untuk mobile, tablet, dan desktop
