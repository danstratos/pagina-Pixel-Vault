/**
 * Servidor Backend - Node.js + Express
 * 
 * Este servidor reemplaza JSON Server y agrega funcionalidades:
 * - CRUD de productos
 * - Autenticación de usuarios
 * - Carrito de compras
 * - Reviews y calificaciones
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// ==================== MIDDLEWARE ====================
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en el body

// ==================== BASE DE DATOS SIMULADA ====================
// En producción, esto sería una base de datos real (MongoDB, PostgreSQL, etc.)
const DB_PATH = path.join(__dirname, '../db.json');

// Función para leer la base de datos
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

// Función para escribir en la base de datos
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// ==================== RUTAS DE PRODUCTOS ====================

/**
 * GET /api/products
 * Obtener todos los productos
 */
app.get('/api/products', (req, res) => {
  try {
    const db = readDB();
    res.json(db.products || []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

/**
 * GET /api/products/:id
 * Obtener un producto por ID
 */
app.get('/api/products/:id', (req, res) => {
  try {
    const db = readDB();
    const product = db.products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

/**
 * POST /api/products
 * Crear un nuevo producto
 */
app.post('/api/products', (req, res) => {
  try {
    const db = readDB();
    
    // Generar ID único
    const newId = String(Math.max(...db.products.map(p => parseInt(p.id)), 0) + 1);
    
    const newProduct = {
      id: newId,
      ...req.body,
      reviews: [], // Inicializar array de reviews
      rating: 0 // Rating inicial
    };
    
    db.products.push(newProduct);
    writeDB(db);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

/**
 * PUT /api/products/:id
 * Actualizar un producto
 */
app.put('/api/products/:id', (req, res) => {
  try {
    const db = readDB();
    const index = db.products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Mantener reviews y rating existentes
    db.products[index] = {
      ...db.products[index],
      ...req.body,
      id: req.params.id
    };
    
    writeDB(db);
    res.json(db.products[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

/**
 * DELETE /api/products/:id
 * Eliminar un producto
 */
app.delete('/api/products/:id', (req, res) => {
  try {
    const db = readDB();
    const index = db.products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    db.products.splice(index, 1);
    writeDB(db);
    
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// ==================== RUTAS DE AUTENTICACIÓN ====================

/**
 * POST /api/auth/register
 * Registrar nuevo usuario
 */
app.post('/api/auth/register', (req, res) => {
  try {
    const db = readDB();
    const { username, email, password } = req.body;
    
    // Validar que no exista el usuario
    if (!db.users) db.users = [];
    
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: String(db.users.length + 1),
      username,
      email,
      password, // En producción: hashear con bcrypt
      createdAt: new Date().toISOString(),
      cart: [],
      wishlist: []
    };
    
    db.users.push(newUser);
    writeDB(db);
    
    // No enviar password en la respuesta
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

/**
 * POST /api/auth/login
 * Iniciar sesión
 */
app.post('/api/auth/login', (req, res) => {
  try {
    const db = readDB();
    const { email, password } = req.body;
    
    if (!db.users) db.users = [];
    
    const user = db.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // No enviar password en la respuesta
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// ==================== RUTAS DE CARRITO ====================

/**
 * GET /api/cart/:userId
 * Obtener carrito de un usuario
 */
app.get('/api/cart/:userId', (req, res) => {
  try {
    const db = readDB();
    const user = db.users?.find(u => u.id === req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

/**
 * POST /api/cart/:userId/add
 * Agregar producto al carrito
 */
app.post('/api/cart/:userId/add', (req, res) => {
  try {
    const db = readDB();
    const { productId, quantity } = req.body;
    
    const userIndex = db.users?.findIndex(u => u.id === req.params.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    if (!db.users[userIndex].cart) {
      db.users[userIndex].cart = [];
    }
    
    // Verificar si el producto ya está en el carrito
    const cartItemIndex = db.users[userIndex].cart.findIndex(
      item => item.productId === productId
    );
    
    if (cartItemIndex !== -1) {
      // Actualizar cantidad
      db.users[userIndex].cart[cartItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      db.users[userIndex].cart.push({ productId, quantity });
    }
    
    writeDB(db);
    res.json(db.users[userIndex].cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});

/**
 * DELETE /api/cart/:userId/remove/:productId
 * Eliminar producto del carrito
 */
app.delete('/api/cart/:userId/remove/:productId', (req, res) => {
  try {
    const db = readDB();
    const userIndex = db.users?.findIndex(u => u.id === req.params.userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    db.users[userIndex].cart = db.users[userIndex].cart.filter(
      item => item.productId !== req.params.productId
    );
    
    writeDB(db);
    res.json(db.users[userIndex].cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
});

// ==================== RUTAS DE REVIEWS ====================

/**
 * POST /api/products/:id/reviews
 * Agregar review a un producto
 */
app.post('/api/products/:id/reviews', (req, res) => {
  try {
    const db = readDB();
    const { userId, rating, comment } = req.body;
    
    const productIndex = db.products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    if (!db.products[productIndex].reviews) {
      db.products[productIndex].reviews = [];
    }
    
    // Buscar usuario
    const user = db.users?.find(u => u.id === userId);
    
    const newReview = {
      id: String(db.products[productIndex].reviews.length + 1),
      userId,
      username: user?.username || 'Usuario',
      rating,
      comment,
      date: new Date().toISOString()
    };
    
    db.products[productIndex].reviews.push(newReview);
    
    // Calcular nuevo rating promedio
    const reviews = db.products[productIndex].reviews;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    db.products[productIndex].rating = Math.round(avgRating * 10) / 10;
    
    writeDB(db);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar review' });
  }
});

/**
 * GET /api/products/:id/reviews
 * Obtener reviews de un producto
 */
app.get('/api/products/:id/reviews', (req, res) => {
  try {
    const db = readDB();
    const product = db.products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product.reviews || []);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reviews' });
  }
});

// ==================== RUTA DE SALUD ====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎮 PIXEL VAULT SERVER RUNNING 🎮    ║
╠════════════════════════════════════════╣
║   Port: ${PORT}                          ║
║   Status: ✅ Ready                     ║
║   API: http://localhost:${PORT}/api      ║
╚════════════════════════════════════════╝
  `);
});
