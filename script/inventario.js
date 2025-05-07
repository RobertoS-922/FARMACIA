// Script para gestión del inventario
const formInventario = document.getElementById('form-inventario');
const listaInventario = document.getElementById('lista-inventario');
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

function guardarInventario() {
  localStorage.setItem('inventario', JSON.stringify(inventario));
}

function mostrarInventario() {
  listaInventario.innerHTML = '';
  inventario.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center border-b pb-2';
    li.innerHTML = `
      <span>${item.producto} - ${item.cantidad} unidades</span>
      <button onclick="eliminarInventario(${index})" class="text-red-500 hover:underline">Eliminar</button>
    `;
    listaInventario.appendChild(li);
  });
}

function eliminarInventario(index) {
  inventario.splice(index, 1);
  guardarInventario();
  mostrarInventario();
}

formInventario.addEventListener('submit', function (e) {
  e.preventDefault();
  const producto = document.getElementById('producto').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  if (producto && cantidad > 0) {
    inventario.push({ producto, cantidad });
    guardarInventario();
    mostrarInventario();
    formInventario.reset();
  }
});

mostrarInventario();
