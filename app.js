const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const port = 3000;


// Middleware
dotenv.config();
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define ToDo model
const asientoSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' }
});

const Asiento = mongoose.model('Asiento', asientoSchema);

// API Routes

// Get all tasks
app.get('/asientos/list', async (req, res) => {
  try {
    const asientos = await Asiento.find();
    res.json(asientos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener asientos: ' + err.message });
  }
});

// Cambiar el estado de un asiento
app.post('/asientos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el asiento actual
    const asiento = await Asiento.findById(id);
    if (!asiento) {
      return res.status(404).json({ error: 'Asiento no encontrado' });
    }

    // Alternar el estado
    asiento.estado = asiento.estado === 'disponible' ? 'ocupado' : 'disponible';
    await asiento.save();

    res.json(asiento);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar asiento: ' + err.message });
  }
});

// Serve index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});