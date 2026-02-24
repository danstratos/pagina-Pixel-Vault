# 🔄 Guía de Migración v1.0 → v2.0

## 📋 Cambios Principales

### ❌ **YA NO SE USA:**
- ~~JSON Server~~ → Ahora usamos Node.js + Express
- ~~App.jsx como página única~~ → Ahora es Store.jsx (una de varias páginas)
- ~~`npm run server` con json-server~~ → Ahora ejecuta Express

### ✅ **NUEVO:**
- Backend en `server/server.js`
- React Router con múltiples páginas
- Sistema de autenticación
- Carrito de compras
- Reviews y calificaciones

---

## 🚀 Cómo Actualizar tu Proyecto

### **Opción 1: Proyecto Nuevo (Recomendado)**

Si quieres empezar desde cero con v2.0:

1. Descarga el proyecto v2.0 completo
2. Extrae en una nueva carpeta
3. Ejecuta:
```bash
npm install
npm start
```

### **Opción 2: Actualizar Proyecto Existente**

Si quieres migrar tu proyecto v1.0:

#### **Paso 1: Backup**
```bash
# Haz una copia de seguridad de tu carpeta actual
cp -r videogame-store videogame-store-v1-backup
```

#### **Paso 2: Actualizar package.json**
Reemplaza tu `package.json` con el nuevo que incluye:
- `react-router-dom`
- `express`
- `cors`
- `concurrently`

#### **Paso 3: Instalar nuevas dependencias**
```bash
npm install
```

#### **Paso 4: Agregar nuevos archivos**

Copia estos archivos/carpetas del proyecto v2.0:
- `/server/` (toda la carpeta)
- `/src/pages/` (toda la carpeta)
- `/src/context/` (toda la carpeta)
- `/src/services/authService.js`
- `/src/services/cartService.js`
- `/src/services/reviewService.js`
- `/src/App.jsx` (nuevo, con Router)
- Nuevos archivos CSS en `/src/styles/`

#### **Paso 5: Mover archivos existentes**
```bash
# Tu App.jsx anterior ahora es Store.jsx
mv src/App.jsx src/pages/Store.jsx

# El CSS también
mv src/styles/App.css src/styles/Store.css
```

#### **Paso 6: Actualizar db.json**
Agrega al final de `db.json`:
```json
{
  "products": [...productos existentes...],
  "users": []
}
```

Agrega a cada producto:
```json
{
  ...producto existente...,
  "rating": 0,
  "reviews": []
}
```

---

## ⚙️ Cambios en Comandos

### **Antes (v1.0)**
```bash
# Terminal 1
npm run server  # Iniciaba JSON Server

# Terminal 2
npm run dev
```

### **Ahora (v2.0)**
```bash
# Opción 1: Todo en uno
npm start

# Opción 2: Manual
# Terminal 1
npm run server  # Ahora inicia Express

# Terminal 2
npm run dev
```

---

## 🔄 Cambios en el Código

### **Importaciones en Store.jsx (antes App.jsx)**

**Antes:**
```javascript
import './styles/App.css';
import ProductCard from './components/ProductCard';
```

**Ahora:**
```javascript
import '../styles/Store.css';
import ProductCard from '../components/ProductCard';
```

### **URL de la API**

**Antes:**
```javascript
const API_URL = 'http://localhost:3001/products';
```

**Ahora:**
```javascript
const API_URL = 'http://localhost:3001/api/products';
```

---

## ✅ Verificar que Todo Funcione

Después de migrar, verifica:

1. ✅ `npm start` inicia sin errores
2. ✅ Puedes ver la landing page en `/`
3. ✅ La tienda funciona en `/store`
4. ✅ Puedes registrarte en `/register`
5. ✅ Puedes iniciar sesión en `/login`
6. ✅ El carrito funciona en `/cart`

---

## 🆘 Problemas Comunes

### **Error: Cannot find module 'react-router-dom'**
```bash
npm install react-router-dom
```

### **Error: Cannot find module 'express'**
```bash
npm install express cors
```

### **El servidor no inicia**
Verifica que `server/server.js` exista y tenga permisos de ejecución.

### **Las rutas no funcionan**
Asegúrate de tener `<BrowserRouter>` en `App.jsx`.

### **El login no funciona**
Verifica que:
1. El backend esté corriendo
2. `db.json` tenga la sección `"users": []`
3. `AuthContext` esté envolviendo la app

---

## 💡 Recomendación

Si estás aprendiendo o presentando el proyecto, es mejor usar la **Opción 1** (proyecto nuevo) para evitar problemas de compatibilidad.

---

¡Disfruta de las nuevas funcionalidades! 🎮✨
