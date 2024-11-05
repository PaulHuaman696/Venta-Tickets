const apiUrl = '/asientos/list';

const asientosList = document.getElementById('asientosList');


// Función para cargar y mostrar los asientos
async function cargarAsientos() {
  try {
    const response = await fetch(apiUrl);
    const asientos = await response.json();

    asientosList.innerHTML = '';
    asientos.forEach(asiento => {
      // Crear el elemento de la lista para cada asiento
      const listItem = document.createElement('li');
      listItem.className = asiento.estado;

      // Crear el botón para alternar el estado
      const button = document.createElement('button');
      button.textContent = `Asiento ${asiento.numero} - ${asiento.estado}`;
      button.onclick = () => cambiarEstadoAsiento(asiento._id);

      // Agregar el botón al elemento de la lista
      listItem.appendChild(button);
      asientosList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error al cargar los asientos:', error);
  }
}

// Función para cambiar el estado del asiento
async function cambiarEstadoAsiento(id) {
  try {
    const response = await fetch(`/asientos/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const asientoActualizado = await response.json();

    // Actualizar la vista de asientos
    cargarAsientos();
  } catch (error) {
    console.error('Error al cambiar el estado del asiento:', error);
  }
}

// Cargar los asientos al cargar la página
document.addEventListener('DOMContentLoaded', cargarAsientos);