# REST API Daftar Sepatu (Laundry Sepatu)

## Deskripsi Umum

Proyek ini merupakan implementasi REST API menggunakan **Node.js**, **Express.js**, dan **Sequelize** yang terhubung ke **Supabase (PostgreSQL)** sebagai basis data.  
API ini digunakan untuk mengelola daftar sepatu yang sedang dicuci, termasuk proses input, pembaruan status, dan penghapusan data.

Tujuan utama dari proyek ini adalah untuk mempermudah pencatatan serta pengelolaan cucian sepatu pada layanan laundry sepatu secara digital dan real-time.

---

## Tujuan

1. Mengimplementasikan konsep **CRUD (Create, Read, Update, Delete)** dalam REST API.
2. Memahami penggunaan **Express.js** dan **Sequelize ORM**.
3. Mengelola data secara terstruktur dengan **PostgreSQL (Supabase)**.
4. Membangun API dengan standar response konsisten (`status`, `data`, `message`).
5. Menambahkan validasi data menggunakan **Joi** untuk menjaga integritas data.

---

## Fitur Utama API

| Metode | Endpoint       | Deskripsi                                             |
| ------ | -------------- | ----------------------------------------------------- |
| GET    | /api/shoes     | Menampilkan seluruh daftar sepatu yang sedang dicuci. |
| GET    | /api/shoes/:id | Menampilkan detail satu sepatu berdasarkan ID.        |
| POST   | /api/shoes     | Menambahkan data sepatu baru ke dalam daftar.         |
| PUT    | /api/shoes/:id | Memperbarui status atau detail sepatu.                |
| DELETE | /api/shoes/:id | Menghapus data sepatu yang sudah selesai dicuci.      |

---

## Struktur Data

Contoh struktur data sepatu di database Supabase:

```json
{
  "id": 1,
  "nama": "Nike Air Force 1",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-"
}
```

**Keterangan:**

- `id` → ID unik sepatu (auto increment)
- `nama` → Nama sepatu atau model sepatu
- `status` → Status proses cucian (`Sedang Dicuci`, `Selesai`)
- `tanggalMasuk` → Tanggal sepatu diterima
- `tanggalSelesai` → Tanggal sepatu selesai dicuci (atau `"-"` jika belum selesai)

---

## Validasi Input (Joi)

Semua request `POST` dan `PUT` akan divalidasi menggunakan **Joi** dengan aturan:

```js
const shoeSchema = Joi.object({
  nama: Joi.string().min(2).required(),
  status: Joi.string().required(),
  tanggalMasuk: Joi.date().required(),
  tanggalSelesai: Joi.string().allow("-", "").optional(),
});
```

Jika data tidak valid, response akan berbentuk:

```json
{
  "status": "error",
  "data": null,
  "message": "\"nama\" is required"
}
```

---

## Format Response API

Semua endpoint akan mengembalikan response dengan format seragam:

```json
{
  "status": "success",
  "data": { ... },
  "message": "Deskripsi singkat hasil operasi"
}
```

Contoh:

**POST /api/shoes**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "-"
  },
  "message": "Shoe created successfully"
}
```

---

## Contoh Request dan Response

### 🔹 GET /api/shoes

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Converse Chuck Taylor",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-01",
      "tanggalSelesai": "2025-10-03"
    }
  ],
  "message": "Fetched all shoes successfully"
}
```

---

### 🔹 POST /api/shoes

Body:

```json
{
  "nama": "Nike Air Max",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-"
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "nama": "Nike Air Max",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "-"
  },
  "message": "Shoe created successfully"
}
```

---

### 🔹 PUT /api/shoes/:id

Body:

```json
{
  "status": "Selesai",
  "tanggalSelesai": "2025-10-09"
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "nama": "Nike Air Max",
    "status": "Selesai",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "2025-10-09"
  },
  "message": "Shoe updated successfully"
}
```

---

### 🔹 DELETE /api/shoes/:id

Response:

```json
{
  "status": "success",
  "data": null,
  "message": "Shoe deleted successfully"
}
```

---

## Teknologi yang Digunakan

- **Node.js** – Environment runtime untuk JavaScript di sisi server.
- **Express.js** – Framework untuk membuat REST API dengan cepat.
- **Sequelize ORM** – Abstraksi untuk query ke database PostgreSQL (Supabase).
- **Joi** – Library untuk validasi data input.
- **Supabase** – Platform database (PostgreSQL) untuk deployment cloud.
- **Vercel** – Digunakan untuk deployment API secara serverless.

---

## Alur Kerja API

1. Client mengirim request HTTP (GET, POST, PUT, DELETE).
2. Server memproses request menggunakan Express.
3. Validasi dilakukan oleh Joi sebelum data masuk ke database.
4. Sequelize menangani interaksi dengan database Supabase.
5. Server mengembalikan response dalam format JSON standar.

---

## Hasil Akhir

Dengan API ini, proses pencatatan dan pengelolaan sepatu di laundry menjadi:

- Lebih **terstruktur dan efisien**.
- Dapat diintegrasikan dengan **dashboard web** atau **aplikasi mobile**.
- Siap untuk **deployment ke Supabase + Vercel**.

---

## Notes

- Pastikan file `.env` berisi konfigurasi koneksi Supabase:
  ```
  DATABASE_URL=postgresql://<user>:<password>@<host>:6543/postgres?pgbouncer=true
  ```

