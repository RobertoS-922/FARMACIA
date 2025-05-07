// Script para gestión de ventas
const formVentas = document.getElementById('form-ventas');
const listaVentas = document.getElementById('lista-ventas');
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

function guardarVentas() {
  localStorage.setItem('ventas', JSON.stringify(ventas));
}

function mostrarVentas() {
  listaVentas.innerHTML = '';
  ventas.forEach((venta, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center border-b pb-2';
    li.innerHTML = `
      <span>${venta.producto} - ${venta.cantidad} unidades</span>
      <button onclick="eliminarVenta(${index})" class="text-red-500 hover:underline">Eliminar</button>
    `;
    listaVentas.appendChild(li);
  });
}

function eliminarVenta(index) {
  ventas.splice(index, 1);
  guardarVentas();
  mostrarVentas();
}

formVentas.addEventListener('submit', function (e) {
  e.preventDefault();
  const producto = document.getElementById('producto-venta').value;
  const cantidad = parseInt(document.getElementById('cantidad-venta').value);
  if (producto && cantidad > 0) {
    ventas.push({ producto, cantidad });
    guardarVentas();
    mostrarVentas();
    formVentas.reset();
  }
});

mostrarVentas();
