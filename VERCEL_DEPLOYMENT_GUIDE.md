# 🚀 Panduan Deployment Vercel - Dermalyze

## 📋 Masalah yang Ditemukan & Solusi

### ❌ Masalah Utama:

1. **Function Runtime Error**: Konfigurasi `functions` yang salah di `vercel.json`
2. **Konfigurasi Build Salah**: Menggunakan `_redirects` (Netlify) bukan `vercel.json`
3. **Entry Point Bermasalah**: Struktur file dan import tidak optimal untuk Vite
4. **Mixed Content Policy**: HTTPS frontend tidak bisa akses HTTP API
5. **Build Script Konflik**: Script build menggunakan copy-assets yang tidak perlu

### ✅ Solusi yang Diterapkan:

#### 1. Konfigurasi Vercel (`vercel.json`)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "http://52.77.219.198:3000/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2. Entry Point Baru (`src/main.jsx`)

- Error boundary untuk menangani crash
- Fallback rendering jika gagal load
- Logging yang lebih baik

#### 3. Build Script Diperbaiki

```json
{
  "build": "vite build --mode production"
}
```

#### 4. Vite Config Dioptimalkan

- Input file yang jelas
- Alias path yang benar
- Output directory yang tepat

## 🔧 Langkah Deployment

### 1. Persiapan Lokal

```bash
# Install dependencies
npm install

# Test build lokal
npm run build

# Test preview
npm run preview
```

### 2. Deploy ke Vercel

1. Push code ke GitHub
2. Connect repository di Vercel dashboard
3. Set build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables (Opsional)

```
VITE_API_URL=https://your-domain.vercel.app/api
VITE_IMAGE_URL=https://your-domain.vercel.app/files
```

## 🐛 Debugging

### File Debug yang Tersedia:

1. `debug-deployment.html` - Test konektivitas dan file
2. `test-build.html` - Verifikasi build berhasil

### Cara Menggunakan:

1. Upload file debug ke `/public/`
2. Akses `https://your-domain.vercel.app/debug-deployment.html`
3. Periksa hasil test

### Console Debugging:

```javascript
// Buka browser console dan jalankan:
console.log("App loaded:", !!document.getElementById("root").children.length);
console.log("Current route:", window.location.hash);
```

## 🔍 Troubleshooting

### Halaman Blank/Kosong:

1. **Periksa Console Browser**: Buka F12 → Console
2. **Periksa Network Tab**: Lihat failed requests
3. **Test API**: Akses `/api/health` langsung
4. **Periksa Build**: Pastikan `dist/` folder ada dan berisi file

### Error 404 pada Routes:

- Pastikan `vercel.json` ada dan benar
- Periksa rewrite rules
- Test dengan hash routing: `/#/analisis`

### API Connection Issues:

- Mixed content policy (HTTPS → HTTP)
- CORS configuration
- Backend server status

## 📁 Struktur File Penting

```
├── vercel.json          # Konfigurasi Vercel
├── vite.config.js       # Konfigurasi Vite
├── src/
│   ├── main.jsx         # Entry point utama
│   ├── index.html       # HTML template
│   └── ...
├── dist/                # Build output
└── public/              # Static assets
```

## 🎯 Checklist Deployment

- [ ] `vercel.json` sudah ada dan benar
- [ ] `package.json` build script sudah benar
- [ ] `src/main.jsx` sebagai entry point
- [ ] Test build lokal berhasil
- [ ] Push ke GitHub
- [ ] Deploy di Vercel
- [ ] Test semua routes
- [ ] Test API connectivity
- [ ] Test responsive design

## 🆘 Jika Masih Bermasalah

1. **Hapus dan redeploy**:

   - Delete deployment di Vercel
   - Clear build cache
   - Deploy ulang

2. **Check Vercel logs**:

   - Buka Vercel dashboard
   - Lihat build logs
   - Periksa function logs

3. **Fallback ke static hosting**:
   - Build dengan `npm run build`
   - Upload `dist/` folder manual
   - Test tanpa API proxy

## 📞 Support

Jika masih ada masalah, periksa:

- Vercel documentation
- Vite deployment guide
- Browser console errors
- Network connectivity
