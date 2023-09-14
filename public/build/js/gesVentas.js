document.addEventListener("DOMContentLoaded", function () {
    let filaE = null; // Variable para rastrear la fila en edición 

    // Función para abrir la ventana emergente
    function openPopup() {
        document.getElementById("addPopup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }
    
    // Función para cerrar la ventana emergente
    function closePopup() {
        document.getElementById("addPopup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        filaE = null; // Restablecer la fila en edición
    }

    // Agregar evento de clic a los botones "Editar" en cada fila de la tabla
    document.querySelectorAll(".edit-button").forEach(function (editButton) {
        editButton.addEventListener("click", function () {
            // Obtener la fila actual
            const filaA = this.closest("tr");

            // Obtener los datos actuales de la fila
            const user = filaA.cells[0].textContent;
            const barber = filaA.cells[1].textContent;
            const service = filaA.cells[2].textContent;
            const Payments = filaA.cells[3].textContent;

            // Mostrar los datos en el formulario de edición
            document.getElementById("user").value = user;
            document.getElementById("barber").value = barber;
            document.getElementById("service").value = service;
            document.getElementById("Payments").value = Payments;

            // Establecer la fila en edición (para actualizar los datos)
            filaE = filaA;

            // Abrir la ventana emergente
            openPopup();
        });
    });

    // Agregar usuario a la tabla al hacer clic en el botón "Agregar"
    document.getElementById("addButton").addEventListener("click", function () {
        const user = document.getElementById("user").value;
        const barber = document.getElementById("barber").value;
        const service = document.getElementById("service").value;
        const Payments = document.getElementById("Payments").value;
        const validaruser = /^[a-zA-Z]{4,15}$/;
        const validarbarber =   /^[0-9]{4,15}$/;
        const validarservice = /^[a-zA-Z]{4,15}$/;
        const validarpayments =  /^[a-zA-Z]{4,15}$/;

        if (filaE) {
            // Actualizar los datos en la fila en edición
            filaE.cells[0].textContent = user;
            filaE.cells[1].textContent = barber;
            filaE.cells[2].textContent = service;
            filaE.cells[3].textContent = Payments;
            filaE = null; // Restablecer la fila en edición
        }  else if (user == "" || barber == "" || service == "" || Payments == "") {
            Swal.fire({
              icon: "warning",
              confirmButtonText: "Aceptar",
              text: "Ingrese datos primero...",
            });
        } else if (user != user.match(validaruser)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "Usuario invalido...",
              });
        } else if (barber != barber.match(validarbarber)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "Barbero invalido...",
              });
        } else if (service != service.match(validarservice)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "El tipo de servicio es invalido...",
              });
        } else if (Payments != Payments.match(validarPayments)) {
            Swal.fire({
                icon: "warning",
                confirmButtonText: "Aceptar",
                text: "El pago es invalido...",
              });
        } else if(user == user.match(validaruser) && barber == barber.match(validarbarber) && service == service.match(validarservice) && Payments == Payments.match(validarpayments)){
            Swal.fire({
                icon: "success",
                confirmButtonText: "Aceptar",
                text: "Se agrego correctamente...",
              });
            // Si no hay fila en edición, crear una nueva fila en la tabla
            const nuevaF = document.createElement("tr");
            nuevaF.innerHTML = `
                <td>${user}</td>
                <td>${barber}</td>
                <td>${service}</td>
                <td>${Payments}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-button"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm delete-button"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            

            // Agregar la fila a la tabla
            document.getElementById("table").appendChild(nuevaF);

            // Asociar evento de clic para editar usuarios a la nueva fila
            nuevaF.querySelector(".edit-button").addEventListener("click", function () {
                const filaA = this.closest("tr");

                const user = filaA.cells[0].textContent;
                const barber = filaA.cells[1].textContent;
                const service = filaA.cells[2].textContent;
                const Payments = filaA.cells[3].textContent;

                document.getElementById("user").value = user;
                document.getElementById("barber").value = barber;
                document.getElementById("service").value = service;
                document.getElementById("Payments").value = Payments;

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
        document.getElementById("user").value = "";
        document.getElementById("barber").value = "";
        document.getElementById("service").value = "";
        document.getElementById("Payments").value = "";

        // Cerrar la ventana emergente
        closePopup();
    });

    // Mostrar la ventana emergente al hacer clic en el botón "Agregar Usuario"
    document.getElementById("icon").addEventListener("click", function () {
        openPopup();
    });

    // Cerrar la ventana emergente al hacer clic en el botón de cierre
    document.getElementById("close").addEventListener("click", function () {
        closePopup();
    });
});

//para la busqueda

$(document).ready(function () {
    $("#search").on("keyup", function () {
        const searchText = $(this).val().toLowerCase();

        // Filtra la tabla basada en el texto de búsqueda
        $("#table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
        });
    });
}); 