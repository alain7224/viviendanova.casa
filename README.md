# 🏠 Vivienda Nova v1.2

Plataforma moderna de viviendas con admin panel, analytics, mapas inteligentes y sistema de auto-actualización.

## ✨ Características

### Frontend
- ✅ Responsive: PC, Mobile, Tablet
- ✅ 6 estilos de tarjetas (flat, 3D, shadow, frame, grid, minimal)
- ✅ Mapas inteligentes con targeting
- ✅ 12 idiomas
- ✅ Criptomonedas (BTC, ETH, USDC)
- ✅ Animaciones iOS
- ✅ SEO optimizado

### Admin Panel
- ✅ Login obligatorio (viviendanova.casa@gmail.com)
- ✅ Dashboard con analytics
- ✅ Gestión de propiedades
- ✅ Carga de fotos/videos
- ✅ Paleta personalizable
- ✅ Sistema de actualizaciones automáticas
- ✅ Backups automáticos

### Infraestructura
- ✅ GitHub Pages (hosting gratis)
- ✅ GitHub Actions (deploy automático)
- ✅ Supabase (storage)
- ✅ HTTPS automático

## 🚀 Instalación

```bash
git clone https://github.com/alain7224/viviendanova.casa.git
cd viviendanova.casa
pnpm install
pnpm dev
```

## 📝 Configuración

1. Copiar `.env.example` a `.env`
2. Completar variables de entorno
3. Correr `pnpm build`

## 🔐 Admin

- URL: `http://localhost:5173/admin`
- Email: `viviendanova.casa@gmail.com`
- Contraseña: (configurar en .env)

## 📦 Deploy

```bash
pnpm build
git add .
git commit -m "feat: actualización"
git push origin main
```

## 📄 Licencia

MIT
