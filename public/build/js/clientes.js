const url = 'https://api-72.onrender.com/api/clientes'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('tabla')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaClientes = data.clientes//Capturar el array devuelto por la api
        datos = 
        listaClientes.map(function(cliente) {//Recorrer el array
            respuesta += `<tr><td>${cliente.usuario}</td>`+
            `<td>${cliente.nombre}</td>`+
            `<td>${cliente.apellido}</td>`+
            `<td>${cliente.correo}</td>`+
            `<td>${cliente.telefono}</td>`+
            `<td><button class="btn btn-primary btn-sm edit-button"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm delete-button"><i class="fas fa-trash-alt"></i></button></td>`+
            `</>`
            
            body.innerHTML = respuesta
        })
    })
    //(${JSON.stringify(cliente)})
    //"("${cliente._id}")'
}

const registrar = async () => {
    let _usuario = document.getElementById('usuario').value;
    let _nombre = document.getElementById('nombre').value;
    let _apellido = document.getElementById('apellido').value;
    let _email = document.getElementById('email').value; 
    let _telefono = document.getElementById('telefono').value;
  
    if (_usuario.length > 0 && _nombre.length > 0) {
      let cliente = {
        usuario: _usuario,
        nombre: _nombre,
        apellido: _apellido,
        correo: _email,
        telefono: _telefono,
      };
  
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(cliente),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((resp) => resp.json())
        .then((json) => {
          if (json.msg) {
            Swal.fire(
              json.msg,
              'Registrado exitosamente',
              'success'
            );

            // After successful registration, fetch and display the updated data
            listarDatos();
          }
        });
    } else {
      Swal.fire(
        'El usuario y el nombre son obligatorios. Favor corregir.',
        '',
        'error'
      );
    }
};


  
  const updateCliente = async (clienteId) => {
    let _usuario = document.getElementById('usuario').value;
    let _nombre = document.getElementById('nombre').value;
    let _apellido = document.getElementById('apellido').value;
    let _email = document.getElementById('email').value;
    let _telefono = document.getElementById('telefono').value;
  
    let cliente = {
      usuario: _usuario,
      nombre: _nombre,
      apellido: _apellido,
      correo: _email,
      telefono: _telefono,
    };
  
    fetch(`${url}/${clienteId}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(cliente),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg) {
          Swal.fire(
            json.msg,
            'Actualizado exitosamente',
            'success'
          );
          listarDatos(); // Refresh the list after successful update
        }
      });
  };

  
  const eliminar = (clienteId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar esta información!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/${clienteId}`, {
          method: 'DELETE',
          mode: 'cors',
        })
          .then((resp) => resp.json())
          .then((json) => {
            if (json.msg) {
              Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
              listarDatos(); // Refresh the list after successful deletion
            }
          });
      }
    });
  };










document.addEventListener("DOMContentLoaded", function () {
    let filaE = null; // Variable para rastrear la fila en edición 

    // Función para abrir la ventana emergente
    function openPopup() {
        document.getElementById("add").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }

    // Función para cerrar la ventana emergente
    function closePopup() {
        document.getElementById("add").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        filaE = null; // Restablecer la fila en edición
    }
    
    // Agregar evento de clic a los botones "Editar" en cada fila de la tabla
    document.querySelectorAll(".edit-button").forEach(function (editButton) {
        editButton.addEventListener("click", function () {
            // Obtener la fila actual
            const filaA = this.closest("tr");

            // Obtener los datos actuales de la fila
            const usuario = filaA.cells[0].textContent;
            const nombre = filaA.cells[1].textContent;
            const apellido = filaA.cells[2].textContent;
            const email = filaA.cells[3].textContent;
            const telefono = filaA.cells[4].textContent;


            // Mostrar los datos en el formulario de edición
            document.getElementById("usuario").value = usuario;
            document.getElementById("nombre").value = nombre;
            document.getElementById("apellido").value = apellido;
            document.getElementById("email").value = email;
            document.getElementById("telefono").value = telefono;

            // Establecer la fila en edición (para actualizar los datos)
            filaE = filaA;

            // Abrir la ventana emergente
            openPopup();
        });
    });

    // Agregar usuario a la tabla al hacer clic en el botón "Agregar"
    document.getElementById("addB").addEventListener("click", function () {
        const usuario = document.getElementById("usuario").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const validarusuario = /^[a-zA-Z]{4,15}$/;
        const validarnombre = /^[a-zA-Z]{4,15}$/;
        const validarapellido = /^[a-zA-Z]{4,15}$/;
        const validartelefono = /^[0-9]{10}$/;
        const validaremail = /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;

        if (filaE) {
            // Actualizar los datos en la fila en edición
            filaE.cells[0].textContent = usuario;
            filaE.cells[1].textContent = nombre;
            filaE.cells[2].textContent = apellido;
            filaE.cells[3].textContent = email;
            filaE.cells[4].textContent = telefono;
            filaE = null; // Restablecer la fila en edición
        } else if (usuario== "" || nombre == "" || apellido == "" || telefono == "" || email == "") {
        Swal.fire({
          icon: "warning",
          confirmButtonText: "Aceptar",
          text: "Ingrese datos primero...",
        });
    } else if (usuario != usuario.match(validarusuario)){
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: "usuario invalido...",
          });

    } else if (nombre != nombre.match(validarnombre)) {
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: "Nombre invalido...",
          });
    } else if (apellido != apellido.match(validarapellido)) {
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: "Apellido invalido...",
          });
    } else if (telefono != telefono.match(validartelefono)) {
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: "Telefono invalido...",
          });
    } else if (email != email.match(validaremail)) {
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: "Email invalido...",
          });
    } else if( usuario == usuario.match(validarusuario) && nombre == nombre.match(validarnombre) && apellido == apellido.match(validarapellido) && telefono == telefono.match(validartelefono) && email == email.match(validaremail)){
        registrar(usuario,nombre,apellido,telefono,email)
        Swal.fire({
            icon: "success",
            confirmButtonText: "Aceptar",
            text: "el usuario se agrego correctamente...",
          });

   
            // Si no hay fila en edición, crear una nueva fila en la tabla
            const nuevaF = document.createElement("tr");
            nuevaF.innerHTML = `
                <td>${usuario}</td>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${email}</td>
                <td>${telefono}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-button"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm delete-button"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;

            // Agregar la fila a la tabla
            document.getElementById("tabla").appendChild(nuevaF);
         

            // Asociar evento de clic para editar usuarios a la nueva fila
            nuevaF.querySelector(".edit-button").addEventListener("click", function () {
                const filaA = this.closest("tr");
                updateCliente()

                const usuario = filaA.cells[0].textContent;
                const nombre = filaA.cells[1].textContent;
                const apellido = filaA.cells[2].textContent;
                const email = filaA.cells[3].textContent;
                const telefono = filaA.cells[4].textContent;

              
                document.getElementById("usuario").value = usuario;
                document.getElementById("nombre").value = nombre;
                document.getElementById("apellido").value = apellido;
                document.getElementById("email").value = email;
                document.getElementById("telefono").value = telefono;



                filaE = filaA;

                

                openPopup();

                
                
                

            });
            

            // Asociar evento de clic para eliminar usuarios a la nueva fila
                // Asociar evento de clic para eliminar usuarios a la nueva fila
                nuevaF.querySelector(".delete-button").addEventListener("click", function () {
                    eliminar()
                    Swal.fire({
                        icon: "question",
                        confirmButtonText: "Aceptar",
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        text: "¿Estás seguro de que deseas eliminar este usuario?",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            nuevaF.remove();
                        }
                    });
                });
            }

            // Limpiar los campos del formulario
            document.getElementById("usuario").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefono").value = "";

            // Cerrar la ventana emergente
            closePopup();
        }
    );
    
    // Mostrar la ventana emergente al hacer clic en el botón "Agregar Usuario"
    document.getElementById("AddUser").addEventListener("click", function () {
        openPopup();
    });

    // Cerrar la ventana emergente al hacer clic en el botón de cierre
    document.getElementById("closeButton").addEventListener("click", function () {
        closePopup();
    });
});

//para la busqueda

$(document).ready(function () {
    $("#searchI").on("keyup", function () {
        const searchText = $(this).val().toLowerCase();

        // Filtra la tabla basada en el texto de búsqueda
        $("#tabla tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
        });
    });
}); 
