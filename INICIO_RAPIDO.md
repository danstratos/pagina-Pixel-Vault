# 🚀 INICIO RÁPIDO - Pixel Vault v2.0

## ⚡ 3 Pasos para Empezar

### **1️⃣ Extraer el ZIP**
Descomprime `videogame-store-v2.zip` en tu carpeta de proyectos

### **2️⃣ Instalar Dependencias**
```bash
cd videogame-store
npm install
```

### **3️⃣ Iniciar la Aplicación**
```bash
npm start
```

¡Listo! Abre `http://localhost:3000` en tu navegador.

---

## 📱 Primeros Pasos en la App

### **Explorar la Landing Page**
- Ve a `http://localhost:3000` (se abre automáticamente)
- Verás el Hero con "PIXEL VAULT"
- Scroll para ver productos destacados
- Click en "EXPLORAR TIENDA"

### **Registrar una Cuenta**
1. Click en "Registrarse" (esquina superior derecha)
2. Llena el formulario
3. Click en "REGISTRARSE"
4. Serás redirigido a la tienda

### **Explorar la Tienda**
- Ve a `/store` o click en "Tienda" en el navbar
- Aquí puedes:
  - ✅ Ver todos los productos
  - ✅ Buscar juegos
  - ✅ Agregar nuevos productos (botón verde)
  - ✅ Editar productos (hover sobre tarjeta)
  - ✅ Eliminar productos

### **Usar el Carrito**
1. Inicia sesión
2. Click en el ícono 🛒 "Carrito"
3. Aquí verás tus productos agregados
4. Puedes eliminar items o proceder al pago

### **Ver "Sobre Nosotros"**
- Click en "Nosotros" en el navbar
- Verás información de la empresa

---

## 🎯 Características Disponibles

✅ **Landing Page** - Hero + Productos destacados  
✅ **Tienda Completa** - CRUD de productos  
✅ **Autenticación** - Login/Register  
✅ **Carrito** - Agregar/eliminar productos  
✅ **Reviews** - Calificaciones (próximamente visible en UI)  
✅ **Navegación** - 6 páginas diferentes  
✅ **Backend** - API REST completa  

---

## 🔧 Comandos Útiles

```bash
# Iniciar todo (backend + frontend)
npm start

# Solo backend
npm run server

# Solo frontend
npm run dev

# Build para producción
npm run build
```

---

## 📂 Estructura de Rutas

| URL | Página |
|-----|--------|
| `/` | Landing page |
| `/store` | Tienda (admin) |
| `/about` | Sobre nosotros |
| `/login` | Iniciar sesión |
| `/register` | Registrarse |
| `/cart` | Carrito (requiere login) |

---

## 🎨 Credenciales de Prueba

Puedes crear tu propia cuenta o usar estas credenciales de prueba:

**Usuario de Prueba:**
- Email: `gamer@test.com`
- Password: `123456`

*(Nota: Tendrás que registrar esta cuenta primero)*

---

## 🆘 Problemas Comunes

### **Error: "Cannot find module"**
```bash
npm install
```

### **Puerto 3000 ya está en uso**
Cierra otras aplicaciones que usen ese puerto o cambia el puerto en `vite.config.js`

### **Puerto 3001 ya está en uso**
Cambia el puerto en `server/server.js` (línea 10)

### **No aparece nada en el navegador**
1. Verifica que ambos servidores estén corriendo
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de estar en `http://localhost:3000`

---

## 📊 Datos de Ejemplo

El proyecto viene con:
- 5 videojuegos de ejemplo
- Base de datos vacía de usuarios (crea tu cuenta)
- Estructura completa para agregar más productos

---

## 🎓 Aprender Más

Lee los siguientes archivos:
- `README.md` - Documentación completa
- `MIGRATION.md` - Guía de actualización desde v1.0
- `DOCUMENTATION.md` - Explicación del código

---

## 🚀 Próximos Pasos

1. ✅ Explora todas las páginas
2. ✅ Crea una cuenta
3. ✅ Agrega productos a la tienda
4. ✅ Prueba el carrito
5. 📝 Lee el código en `/src`
6. 🎨 Personaliza los colores en `/src/styles/App.css`
7. 🌐 Sube a GitHub
8. 🚀 Deploy en Vercel/Netlify

---

¡Disfruta tu tienda de videojuegos! 🎮✨

**¿Necesitas ayuda?**  
Revisa los archivos de documentación o abre un issue en GitHub.
