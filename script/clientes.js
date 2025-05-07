// script/clientes.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-clientes");
    const lista = document.getElementById("lista-clientes");
  
    // Cargar datos desde localStorage al iniciar
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    renderLista();
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre-cliente").value.trim();
      const consulta = document.getElementById("consulta-cliente").value.trim();
  
      if (!nombre || !consulta) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      const nuevoCliente = {
        id: Date.now(),
        nombre,
        consulta
      };
  
      clientes.push(nuevoCliente);
      guardarEnStorage();
      renderLista();
      form.reset();
    });
  
    function renderLista() {
      lista.innerHTML = "";
  
      if (clientes.length === 0) {
        lista.innerHTML = "<p class='text-gray-500'>No hay consultas registradas.</p>";
        return;
      }
  
      clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.className = "border-b py-2 flex justify-between items-start";
  
        li.innerHTML = `
          <div>
            <p><strong>${cliente.nombre}</strong></p>
            <p class="text-gray-600">${cliente.consulta}</p>
          </div>
          <button data-id="${cliente.id}" class="text-red-500 hover:underline text-sm">Eliminar</button>
        `;
  
        lista.appendChild(li);
      });
  
      // Añadir eventos a los botones de eliminar
      document.querySelectorAll("button[data-id]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = parseInt(e.target.getAttribute("data-id"));
          eliminarCliente(id);
        });
      });
    }
  
    function eliminarCliente(id) {
      clientes = clientes.filter(cliente => cliente.id !== id);
      guardarEnStorage();
      renderLista();
    }
  
    function guardarEnStorage() {
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  });
  