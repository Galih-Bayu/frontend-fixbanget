# 🚀 Panduan Deployment Dermalyze

## 📋 Masalah yang Diperbaiki

Sebelumnya aplikasi tidak bisa login/register saat di-deploy karena:

1. **Hardcoded API URLs** - Semua service menggunakan IP hardcoded
2. **Environment tidak terkonfigurasi** - Tidak ada pemisahan antara development dan production
3. **Console logs berlebihan** - Mengganggu performance di production

## ✅ Solusi yang Diterapkan

### 1. Environment Configuration

- ✅ File `.env.development` untuk development
- ✅ File `.env.production` untuk production
- ✅ Config otomatis switch berdasarkan environment

### 2. Centralized Configuration

- ✅ File `src/scripts/config.js` sebagai single source of truth
- ✅ Semua service menggunakan CONFIG dari file ini
- ✅ Support untuk Vite environment variables

### 3. Conditional Logging

- ✅ Console logs hanya muncul di development
- ✅ Production build lebih clean dan performant

## 🛠️ Cara Deploy

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for development (dengan logging)
npm run build:dev
```

### Production

```bash
# Build for production (tanpa logging)
npm run build

# Preview production build
npm run preview:prod
```

## 🔧 Environment Variables

### Development (.env.development)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_POCKETBASE_URL=http://52.77.219.198:8090
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_RAPIDAPI_HOST=contextualwebsearch-websearch-v1.p.rapidapi.com
VITE_ENABLE_LOGGING=true
```

### Production (.env.production)

```env
VITE_API_BASE_URL=http://52.77.219.198:3000/api
VITE_POCKETBASE_URL=http://52.77.219.198:8090
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_RAPIDAPI_HOST=contextualwebsearch-websearch-v1.p.rapidapi.com
VITE_ENABLE_LOGGING=false
```

## 🌐 Deploy ke Platform

### Vercel

1. Connect repository ke Vercel
2. Set environment variables di Vercel dashboard
3. Deploy otomatis dari main branch

### Netlify

1. Connect repository ke Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables di Netlify dashboard

### Manual Server

1. Build: `npm run build`
2. Upload folder `dist` ke server
3. Configure web server untuk SPA routing

## 🔍 Troubleshooting

### Login/Register tidak berfungsi setelah deploy?

#### ✅ **API Endpoints yang Tersedia:**

- Register: `http://52.77.219.198:3000/api/register`
- Login: `http://52.77.219.198:3000/api/login`
- Logout: `http://52.77.219.198:3000/api/logout`
- Predict: `http://52.77.219.198:3000/api/predict`
- Products: `http://52.77.219.198:3000/api/products`
- History: `http://52.77.219.198:3000/api/history`

#### 🔧 **Langkah Debugging:**

1. **Test API Connection:**

   - Buka file `test-api-connection.html` di browser
   - Klik "Test Products Endpoint" untuk cek koneksi
   - Jika berhasil, API server berjalan dengan baik

2. **Check CORS Error:**

   - Buka Developer Tools (F12) → Console
   - Jika ada error "CORS policy", backend perlu dikonfigurasi
   - Error "Failed to fetch" biasanya CORS issue

3. **Test Manual di Browser:**

   - Buka: `http://52.77.219.198:3000/api/products`
   - Jika muncul data JSON, server berjalan
   - Jika error 404, server down atau endpoint salah

4. **Check Network Tab:**
   - Developer Tools → Network tab
   - Coba login/register
   - Lihat request yang failed dan error messagenya

### Console penuh dengan logs?

1. ✅ Pastikan menggunakan `npm run build` (bukan `npm run build:dev`)
2. ✅ Check `VITE_ENABLE_LOGGING=false` di production

### API calls gagal?

1. ✅ Check `VITE_API_BASE_URL` sesuai dengan backend URL
2. ✅ Pastikan backend accessible dari domain deployment
3. ✅ Check HTTPS/HTTP compatibility

### ❌ Mixed Content Error - Solusi:

Jika muncul error seperti:

```
Mixed Content: The page at 'https://yoursite.netlify.app' was loaded over HTTPS, but requested an insecure resource 'http://52.77.219.198:3000/api/register'. This request has been blocked.
```

**✅ Solusi yang Sudah Diterapkan:**

1. **Netlify Proxy** - File `public/_redirects` sudah dikonfigurasi
2. **Smart Configuration** - Otomatis menggunakan proxy di production
3. **Development Support** - Tetap menggunakan direct HTTP di localhost

**Cara Deploy dengan Proxy:**

1. Build: `npm run build`
2. Deploy folder `dist` ke Netlify
3. Netlify akan otomatis menggunakan proxy untuk `/api/*` requests

**Alternative Solutions:**

1. Backend menggunakan HTTPS dengan SSL certificate
2. Deploy frontend dan backend di domain yang sama
3. Gunakan reverse proxy di server

## 📱 Testing

### Local Testing

```bash
# Test development
npm run dev

# Test production build locally
npm run build
npm run preview:prod
```

### Production Testing

1. Deploy ke staging environment dulu
2. Test semua fitur (login, register, analisis, dll)
3. Check console untuk errors
4. Test di berbagai device/browser

## 🎯 Checklist Deploy

- [ ] Environment variables configured
- [ ] Backend server running
- [ ] CORS configured di backend
- [ ] Build berhasil tanpa error
- [ ] Login/register berfungsi
- [ ] API calls berhasil
- [ ] No console errors di production
- [ ] Responsive di mobile
- [ ] Performance acceptable

## 📞 Support

Jika masih ada masalah setelah mengikuti panduan ini:

1. Check console browser untuk error details
2. Check network tab untuk failed API calls
3. Verify backend server status
4. Contact team untuk debugging
