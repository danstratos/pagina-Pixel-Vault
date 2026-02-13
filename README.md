# 🎮 Pixel Vault - Game Store

Una aplicación web SPA (Single Page Application) desarrollada con React + Vite para gestionar el inventario de una tienda de videojuegos con operaciones CRUD completas.

## ✨ Características

### Funcionalidades Principales

- **📋 Listado de Productos**: Vista de cuadrícula con todos los videojuegos disponibles
- **➕ Crear Producto**: Formulario completo para agregar nuevos juegos al inventario
- **✏️ Actualizar Producto**: Edición de productos existentes con formulario prellenado
- **🗑️ Eliminar Producto**: Eliminación con confirmación de productos
- **🔍 Búsqueda**: Búsqueda en tiempo real por nombre, descripción o categoría
- **📊 Inventario Completo**: Tabla detallada con todo el stock disponible
- **📈 Estadísticas**: Panel con métricas del inventario en tiempo real

### Detalles de Productos

Cada producto incluye:
- Nombre
- Descripción
- Precio
- Cantidad disponible
- Imagen representativa
- Categoría

### Categorías Disponibles

- Acción
- Aventura
- RPG
- Deportes
- Carreras
- Estrategia
- Shooter
- Plataformas

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Instalar JSON Server** (para el backend simulado):
   ```bash
   npm install -g json-server
   ```

## 🎯 Uso

### Iniciar el Backend (JSON Server)

En una terminal, ejecuta:

```bash
npm run server
```

Esto iniciará el servidor en `http://localhost:3001`

### Iniciar el Frontend (React + Vite)

En otra terminal, ejecuta:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎨 Diseño

La aplicación cuenta con un diseño **retro-gaming arcade** con elementos modernos:

- 🌈 Paleta de colores neón vibrante
- ⚡ Animaciones suaves y efectos de hover
- 🎯 Tipografía pixel-art (Press Start 2P) para títulos
- 💫 Efectos de glow y sombras neón
- 📱 Diseño completamente responsive

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca de UI
- **Vite**: Build tool y bundler
- **CSS3**: Estilos personalizados con animaciones

### Backend
- **JSON Server**: API REST simulada

### Tipografías
- **Press Start 2P**: Títulos retro
- **Orbitron**: Texto general futurista

## 📁 Estructura del Proyecto

```
videogame-store/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx      # Tarjeta de producto
│   │   ├── ProductForm.jsx      # Formulario crear/editar
│   │   └── SearchBar.jsx        # Barra de búsqueda
│   ├── services/
│   │   └── productService.js    # API service para CRUD
│   ├── styles/
│   │   ├── App.css              # Estilos principales
│   │   ├── ProductCard.css      # Estilos de tarjetas
│   │   ├── ProductForm.css      # Estilos de formulario
│   │   └── SearchBar.css        # Estilos de búsqueda
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Punto de entrada
├── db.json                      # Base de datos simulada
├── index.html                   # HTML principal
├── vite.config.js              # Configuración de Vite
└── package.json                 # Dependencias
```

## 🔄 API Endpoints

El backend simulado (JSON Server) expone los siguientes endpoints:

- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener un producto por ID
- `POST /products` - Crear un nuevo producto
- `PUT /products/:id` - Actualizar un producto
- `DELETE /products/:id` - Eliminar un producto

## 💡 Características de UX

### Animaciones
- Fade-in escalonado de tarjetas
- Efectos hover con transformaciones 3D
- Transiciones suaves en todos los elementos
- Loading spinner durante la carga

### Interactividad
- Confirmación antes de eliminar
- Preview de imágenes en el formulario
- Overlay con botones de acción en hover
- Feedback visual en todas las acciones

### Responsive Design
- Adaptación completa a móviles y tablets
- Grid responsive que se ajusta al tamaño de pantalla
- Tabla que se convierte en lista en móviles
- Controles optimizados para touch

## 🎮 Flujo de Uso

1. **Inicio**: Al cargar, se muestran todos los productos disponibles
2. **Buscar**: Usa la barra de búsqueda para filtrar productos
3. **Agregar**: Click en "AGREGAR JUEGO" para crear un nuevo producto
4. **Editar**: Hover sobre una tarjeta y click en "EDITAR"
5. **Eliminar**: Hover sobre una tarjeta y click en "ELIMINAR" (con confirmación)
6. **Ver Inventario**: Scroll hacia abajo para ver la tabla completa

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que JSON Server esté instalado: `npm install -g json-server`
- Asegúrate de que el puerto 3001 esté disponible

### Las imágenes no cargan
- Verifica que las URLs de las imágenes sean válidas
- Usa URLs de servicios como Unsplash o servicios de imágenes

### Errores de CORS
- JSON Server debería manejar CORS automáticamente
- Si persiste, agrega `--middlewares ./cors.js` al comando de server

## 🔮 Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Filtros avanzados por categoría y precio
- [ ] Ordenamiento de productos
- [ ] Paginación
- [ ] Carrito de compras
- [ ] Sistema de reviews
- [ ] Upload de imágenes
- [ ] Modo oscuro/claro toggle

## 📝 Licencia

Este proyecto fue creado con fines educativos y de demostración.

## 👨‍💻 Autor

Desarrollado como proyecto de aprendizaje de React + Vite con CRUD completo.

---

¡Disfruta gestionando tu tienda de videojuegos! 🎮✨
