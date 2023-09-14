const url = 'https://api-72.onrender.com/api/clientes'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
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
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(cliente)})' >Editar</a> <a class="waves-effect waves-light btn modal-danger deep-orange darken-4" href='#' onclick='eliminar("${cliente._id}")'>Eliminar</a></td>`+
            `</>`
            body.innerHTML = respuesta
        })
    })
}

/*document.addEventListener("DOMContentLoaded", function () {
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
            const nombre = filaA.cells[0].textContent;
            const apellido = filaA.cells[1].textContent;
            const telefono = filaA.cells[2].textContent;
            const email = filaA.cells[3].textContent;

            // Mostrar los datos en el formulario de edición
            document.getElementById("nombre").value = nombre;
            document.getElementById("apellido").value = apellido;
            document.getElementById("telefono").value = telefono;
            document.getElementById("email").value = email;

            // Establecer la fila en edición (para actualizar los datos)
            filaE = filaA;

            // Abrir la ventana emergente
            openPopup();
        });
    });

    // Agregar usuario a la tabla al hacer clic en el botón "Agregar"
    document.getElementById("addB").addEventListener("click", function () {
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const validarnombre = /^[a-zA-Z]{4,15}$/;
        const validarapellido = /^[a-zA-Z]{4,15}$/;
        const validartelefono = /^[0-9]{10}$/;
        const validaremail = /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;

        if (filaE) {
            // Actualizar los datos en la fila en edición
            filaE.cells[0].textContent = nombre;
            filaE.cells[1].textContent = apellido;
            filaE.cells[2].textContent = telefono;
            filaE.cells[3].textContent = email;
            filaE = null; // Restablecer la fila en edición
        } else if (nombre == "" || apellido == "" || telefono == "" || email == "") {
        Swal.fire({
          icon: "warning",
          confirmButtonText: "Aceptar",
          text: "Ingrese datos primero...",
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
    } else if(nombre == nombre.match(validarnombre) && apellido == apellido.match(validarapellido) && telefono == telefono.match(validartelefono) && email == email.match(validaremail)){
        Swal.fire({
            icon: "success",
            confirmButtonText: "Aceptar",
            text: "el usuario se agrego correctamente...",
          });
   
            // Si no hay fila en edición, crear una nueva fila en la tabla
            const nuevaF = document.createElement("tr");
            nuevaF.innerHTML = `
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${telefono}</td>
                <td>${email}</td>
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


                const nombre = filaA.cells[0].textContent;
                const apellido = filaA.cells[1].textContent;
                const telefono = filaA.cells[2].textContent;
                const email = filaA.cells[3].textContent;

              

                document.getElementById("nombre").value = nombre;
                document.getElementById("apellido").value = apellido;
                document.getElementById("telefono").value = telefono;
                document.getElementById("email").value = email;


                filaE = filaA;
                

                openPopup();

            });
            

            // Asociar evento de clic para eliminar usuarios a la nueva fila
                // Asociar evento de clic para eliminar usuarios a la nueva fila
                nuevaF.querySelector(".delete-button").addEventListener("click", function () {
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
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("email").value = "";

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
}); */
