// start in slider
let btnCloseOpner = document.querySelector("#btn");
let sideBar = document.querySelector("aside");
let overlaySide = document.querySelector(".overlaySide");

btnCloseOpner.addEventListener("click", () => {
  sideBar.classList.toggle("openCloseAnimation");
});

overlaySide.addEventListener("click", () => {
  sideBar.classList.toggle("openCloseAnimation");
  btnCloseOpen.classList.remove("on");
  overlaySide.classList.add("hideSideOverlay");
});

let btnCloseOpen = document.getElementById("btn");
btnCloseOpen.addEventListener("click", function () {
  if (this.className == "on") {
    this.classList.remove("on");
    overlaySide.classList.add("hideSideOverlay");
  } else {
    overlaySide.classList.remove("hideSideOverlay");
    this.classList.add("on");
  }
});

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
    console.log("ddd");
    desplegable.classList.toggle("open");
  });
});
