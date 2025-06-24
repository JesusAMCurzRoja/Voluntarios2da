
const url = 'http://localhost/voluntarios_crud/backend/voluntarios.php';

// Alta
if (document.getElementById("formAlta")) {
  document.getElementById("formAlta").addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${url}?action=create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const result = await res.json();
    alert("Voluntario registrado correctamente");
    e.target.reset();
  });
}

// Gestión
if (document.getElementById("tablaVoluntarios")) {
  async function cargarVoluntarios() {
    const res = await fetch(`${url}?action=read`);
    const data = await res.json();
    const tbody = document.querySelector("#tablaVoluntarios tbody");
    tbody.innerHTML = "";
    data.forEach(v => {
      tbody.innerHTML += `
        <tr>
          <td>${v.id}</td><td>${v.nombre}</td><td>${v.apellidos}</td><td>${v.edad}</td>
          <td>${v.correo}</td><td>${v.telefono}</td><td>${v.ocupacion}</td>
          <td>
            <button onclick='editar(${JSON.stringify(v).replace(/"/g, "&quot;")})'>Editar</button>
            <button onclick='eliminar(${v.id})'>Eliminar</button>
          </td>
        </tr>
      `;
    });
  }

  window.eliminar = async function(id) {
    if (confirm("¿Eliminar este voluntario?")) {
      await fetch(`${url}?action=delete&id=${id}`);
      cargarVoluntarios();
    }
  };

  window.editar = function(v) {
    const form = document.getElementById("formEditar");
    form.id.value = v.id;
    form.nombre.value = v.nombre;
    form.apellidos.value = v.apellidos;
    form.edad.value = v.edad;
    form.correo.value = v.correo;
    form.telefono.value = v.telefono;
    form.ocupacion.value = v.ocupacion;
    document.getElementById("editContainer").style.display = "block";
  };

  window.cerrarModal = function() {
    document.getElementById("editContainer").style.display = "none";
  };

  document.getElementById("formEditar").addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));
    const res = await fetch(`${url}?action=update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const result = await res.json();
    alert("Voluntario actualizado");
    cerrarModal();
    cargarVoluntarios();
  });

  cargarVoluntarios();
}
