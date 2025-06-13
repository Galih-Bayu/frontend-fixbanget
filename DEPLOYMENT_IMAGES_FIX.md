# 🖼️ Perbaikan Gambar/Logo Tidak Muncul Saat Deploy

## 🔍 **Masalah yang Ditemukan:**

1. **Konfigurasi Vite yang salah** - `root: resolve(__dirname, "src")` menyebabkan public directory tidak ter-copy dengan benar
2. **Favicon tidak ada di public folder** - hanya ada di `src/public/`
3. **Static assets tidak ter-copy saat build** - gambar partner dan foto profil tidak tersedia di production

## ✅ **Perbaikan yang Dilakukan:**

### 1. **Struktur Folder yang Benar**
```
project-root/
├── public/                 ← Static assets untuk production
│   ├── favicon.png        ← Favicon
│   ├── _redirects         ← Netlify redirects
│   └── images/            ← Gambar-gambar
│       ├── logo.png
│       ├── gunadarma.png
│       ├── dicoding.png
│       ├── dbs.webp
│       ├── Fadiah.jpg
│       ├── Galih.jpg
│       ├── Hiro.jpg
│       ├── L.jpg
│       ├── Muti.jpg
│       ├── jj.jpg
│       ├── og-image.jpg
│       └── twitter-card.jpg
├── src/
│   ├── public/            ← Backup (tidak digunakan saat build)
│   └── ...
└── dist/                  ← Build output
```

### 2. **Konfigurasi Vite yang Diperbaiki**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"), // Menunjuk ke public folder yang benar
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

### 3. **Script Build yang Enhanced**
```json
{
  "scripts": {
    "build": "vite build --mode production && node copy-assets.js",
    "build:simple": "vite build --mode production",
    "copy-assets": "node copy-assets.js"
  }
}
```

### 4. **Copy Assets Script**
File `copy-assets.js` memastikan semua asset dari `public/` ter-copy ke `dist/` dengan benar.

## 🚀 **Cara Deploy yang Benar:**

### **Untuk Development:**
```bash
npm run dev
# Gambar akan tersedia di http://localhost:5173/images/logo.png
```

### **Untuk Production Build:**
```bash
# Build dengan copy assets otomatis
npm run build

# Atau build manual + copy assets
npm run build:simple
npm run copy-assets
```

### **Deploy ke Netlify:**
1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:** Set di Netlify dashboard

### **Deploy ke Vercel:**
1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Environment Variables:** Set di Vercel dashboard

## 🔧 **Troubleshooting:**

### **Gambar masih tidak muncul setelah deploy?**

1. **Check build output:**
   ```bash
   npm run build
   ls -la dist/images/  # Pastikan gambar ada di sini
   ```

2. **Check URL di browser:**
   ```
   https://yoursite.com/images/logo.png
   https://yoursite.com/favicon.png
   ```

3. **Check console browser untuk 404 errors**

4. **Verify file paths dalam kode:**
   ```javascript
   // ✅ Benar
   <img src="/images/logo.png" alt="Logo" />
   
   // ❌ Salah
   <img src="./images/logo.png" alt="Logo" />
   <img src="images/logo.png" alt="Logo" />
   ```

### **Favicon tidak muncul?**

1. **Check file ada di public/favicon.png**
2. **Check HTML reference:**
   ```html
   <link rel="shortcut icon" href="/favicon.png" />
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

### **Logo partner tidak muncul?**

1. **Check Footer.jsx:**
   ```javascript
   // Pastikan path benar
   <img src="/images/gunadarma.png" alt="Universitas Gunadarma" />
   <img src="/images/dicoding.png" alt="Dicoding" />
   <img src="/images/dbs.webp" alt="DBS Foundation" />
   ```

2. **Check file ada di public/images/**

## 📋 **Checklist Deploy:**

- [ ] ✅ Semua gambar ada di `public/images/`
- [ ] ✅ Favicon ada di `public/favicon.png`
- [ ] ✅ Build berhasil: `npm run build`
- [ ] ✅ Check dist folder: gambar ter-copy dengan benar
- [ ] ✅ Test local preview: `npm run preview`
- [ ] ✅ Deploy ke platform (Netlify/Vercel)
- [ ] ✅ Test production: semua gambar muncul
- [ ] ✅ Check favicon di browser tab
- [ ] ✅ Check logo partner di footer

## 🎯 **Files yang Diperbaiki:**

1. `vite.config.js` - Konfigurasi build
2. `package.json` - Script build enhanced
3. `copy-assets.js` - Script copy assets
4. `public/` folder - Semua static assets
5. `DEPLOYMENT_IMAGES_FIX.md` - Dokumentasi ini

## 📞 **Status: ✅ RESOLVED**

Gambar dan logo sekarang akan muncul dengan benar saat deploy dengan mengikuti langkah-langkah di atas.
