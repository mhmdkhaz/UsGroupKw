// startin remove row from table slider
const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    row.classList.add("fade-out");
    setTimeout(() => {
      row.remove();
    }, 500);
  });
});

// Obtener todas las opciones principales con desplegables
const opcionesCon = document.querySelectorAll(".optionSide");

// Agregar evento de clic a cada opción principal
opcionesCon.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    // Obtener el desplegable asociado a la opción
    const desplegable = opcion.querySelector(".desplegable");
    // Alternar la clase "open" para mostrar u ocultar el desplegable con transición suave
    desplegable.classList.toggle("open");
  });
});
