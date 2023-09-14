document.addEventListener("DOMContentLoaded", function () {
    let filaE = null; // Variable para rastrear la fila en edición 

    // Función para abrir la ventana emergente
    function openPopup() {
        document.getElementById("addUserPopup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }

    // Función para cerrar la ventana emergente
    function closePopup() {
        document.getElementById("addUserPopup").style.display = "none";
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
            const pago = filaA.cells[1].textContent;
            const tipservicio = filaA.cells[2].textContent;
            const formpago = filaA.cells[3].textContent;

            // Mostrar los datos en el formulario de edición
            document.getElementById("usuario").value = usuario;
            document.getElementById("pago").value = pago;
            document.getElementById("tipservicio").value = tipservicio;
            document.getElementById("formpago").value = formpago;

            // Establecer la fila en edición (para actualizar los datos)
            filaE = filaA;

            // Abrir la ventana emergente
            openPopup();
        });
    });

    // Agregar usuario a la tabla al hacer clic en el botón "Agregar"
    document.getElementById("addUserButton").addEventListener("click", function () {
        const usuario = document.getElementById("usuario").value;
        const pago = document.getElementById("pago").value;
        const tipservicio = document.getElementById("tipservicio").value;
        const formpago = document.getElementById("formpago").value;
        const validarusuario = /^[a-zA-Z]{4,15}$/;
        const validarpago =   /^[0-9]{4,15}$/;
        const validartipservicio = /^[a-zA-Z]{4,15}$/;
        const validarformpago =  /^[a-zA-Z]{4,15}$/;

       // /^[a-zA-Z]{4,15}$/;
        ///^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;
     // /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;

        if (filaE) {
            // Actualizar los datos en la fila en edición
            filaE.cells[0].textContent = usuario;
            filaE.cells[1].textContent = pago;
            filaE.cells[2].textContent = tipservicio;
            filaE.cells[3].textContent = formpago;
            filaE = null; // Restablecer la fila en edición
        } 
         else if (usuario == "" || pago == "" || tipservicio == "" || formpago == "") {
            Swal.fire({
              icon: "warning",
              confirmButtonText: "Aceptar",
              text: "Ingrese datos primero...",
            });
        } else if (usuario != usuario.match(validarusuario)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "Nombre invalido...",
              });
        } else if (pago != pago.match(validarpago)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "Pago invalido...",
              });
        } else if (tipservicio != tipservicio.match(validartipservicio)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "El tipo de servicio es invalido...",
              });
        } else if (formpago != formpago.match(validarformpago)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "Forma de pago invalido...",
              });
        } else if(usuario == usuario.match(validarusuario) && pago == pago.match(validarpago) && tipservicio == tipservicio.match(validartipservicio) && formpago == formpago.match(validarformpago)){
            Swal.fire({
                icon: "success",
                confirmButtonText: "Aceptar",
                text: "Se agrego correctamente...",
              });
            // Si no hay fila en edición, crear una nueva fila en la tabla
            const nuevaF = document.createElement("tr");
            nuevaF.innerHTML = `
                <td>${usuario}</td>
                <td>${pago}</td>
                <td>${tipservicio}</td>
                <td>${formpago}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-button"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm delete-button"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;

            // Agregar la fila a la tabla
            document.getElementById("userTable").appendChild(nuevaF);

            // Asociar evento de clic para editar usuarios a la nueva fila
            nuevaF.querySelector(".edit-button").addEventListener("click", function () {
                const filaA = this.closest("tr");

                const usuario = filaA.cells[0].textContent;
                const pago = filaA.cells[1].textContent;
                const tipservicio = filaA.cells[2].textContent;
                const formpago = filaA.cells[3].textContent;

                document.getElementById("usuario").value = usuario;
                document.getElementById("pago").value = pago;
                document.getElementById("tipservicio").value = tipservicio;
                document.getElementById("formpago").value = formpago;

                filaE = filaA;

                openPopup();
            });

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
        document.getElementById("usuario").value = "";
        document.getElementById("pago").value = "";
        document.getElementById("tipservicio").value = "";
        document.getElementById("formpago").value = "";

        // Cerrar la ventana emergente
        closePopup();
    });

    // Mostrar la ventana emergente al hacer clic en el botón "Agregar Usuario"
    document.getElementById("showAddUserForm").addEventListener("click", function () {
        openPopup();
    });

    // Cerrar la ventana emergente al hacer clic en el botón de cierre
    document.getElementById("closeButton").addEventListener("click", function () {
        closePopup();
    });
});

//para la busqueda

$(document).ready(function () {
    $("#searchInput").on("keyup", function () {
        const searchText = $(this).val().toLowerCase();

        // Filtra la tabla basada en el texto de búsqueda
        $("#userTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
        });
    });
}); 
