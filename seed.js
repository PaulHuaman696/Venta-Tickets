// Archivo: seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB para precargar datos'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelo de Asiento
const asientoSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' }
});

const Asiento = mongoose.model('Asiento', asientoSchema);

// Datos de asientos a precargar
const asientos = Array.from({ length: 15 }, (_, i) => ({
  numero: i + 1,
  estado: i % 2 === 0 ? 'disponible' : 'ocupado'  // Alternar entre disponible y ocupado
}));

// Función para precargar los datos
async function precargarAsientos() {
  try {
    // Limpiar la colección de asientos existente
    await Asiento.deleteMany({});
    console.log('Colección de asientos limpiada.');

    // Insertar los asientos de ejemplo
    await Asiento.insertMany(asientos);
    console.log('Datos de asientos precargados correctamente.');

    // Cerrar la conexión
    mongoose.connection.close();
  } catch (err) {
    console.error('Error al precargar asientos:', err);
    mongoose.connection.close();
  }
}

// Ejecutar la función de precarga
precargarAsientos();