# 🚀 Guía de Inicio Rápido

## Opción 1: Inicio Automático

```bash
./start.sh
```

Luego, en **otra terminal**:
```bash
npm run server
```

## Opción 2: Inicio Manual

### Terminal 1 - Backend (JSON Server)
```bash
npm install
npm run server
```

Esto iniciará el servidor en: `http://localhost:3001`

### Terminal 2 - Frontend (React + Vite)
```bash
npm run dev
```

Esto iniciará la aplicación en: `http://localhost:3000`

## 📝 Primeros Pasos

1. **Abre tu navegador** en `http://localhost:3000`
2. **Explora los productos** ya existentes en el inventario
3. **Prueba la búsqueda** escribiendo en el campo de búsqueda
4. **Agrega un nuevo juego** haciendo click en "AGREGAR JUEGO"
5. **Edita un producto** haciendo hover sobre una tarjeta y click en "EDITAR"
6. **Elimina un producto** haciendo hover y click en "ELIMINAR"

## 🎯 Datos de Prueba

La aplicación viene con 5 productos de ejemplo:
- The Legend of Zelda: Breath of the Wild
- Cyberpunk 2077
- FIFA 24
- Elden Ring
- Mario Kart 8 Deluxe

## 🛠️ Solución Rápida de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port 3000 already in use"
El puerto está ocupado. Cierra otras aplicaciones o edita `vite.config.js` para cambiar el puerto.

### Error: "Port 3001 already in use"
El puerto del backend está ocupado. Puedes cambiar el puerto editando `package.json` en el script "server".

### Las imágenes no cargan
Verifica tu conexión a internet. Las imágenes se cargan desde Unsplash.

## 📱 Características para Probar

✅ **CRUD Completo**: Crear, leer, actualizar y eliminar productos  
✅ **Búsqueda**: Filtra por nombre, descripción o categoría  
✅ **Validación**: Los campos obligatorios están validados  
✅ **Confirmación**: Al eliminar, se pide confirmación  
✅ **Preview**: Al agregar URL de imagen, se muestra preview  
✅ **Responsive**: Prueba en diferentes tamaños de pantalla  
✅ **Animaciones**: Hover sobre las tarjetas para ver efectos  

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `src/styles/App.css`:
```css
:root {
  --color-primary: #ff006e;
  --color-secondary: #8338ec;
  --color-accent: #ffbe0b;
  /* ... */
}
```

### Agregar Más Categorías
Edita `src/components/ProductForm.jsx` en las opciones del select.

### Modificar Productos Iniciales
Edita `db.json` para agregar/modificar/eliminar productos de ejemplo.

---

**¡Listo para empezar!** 🎮✨
