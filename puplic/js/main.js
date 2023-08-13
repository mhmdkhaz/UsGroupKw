let elem = document.querySelector(".main-carousel");
let itemMain = document.querySelectorAll(".heroSlider .carousel-cell");

let flkty = new Flickity(elem, {
  cellAlign: "center",
  contain: true,
  autoPlay: 2500,
  freeScroll: true,
  wrapAround: true,
});

if (itemMain.length <= 2) {
  itemMain.forEach((cellSlider) => {
    cellSlider.style.width = "100%";
  });
}
console.log(itemMain.length);

var category = document.querySelector(".carouselCategory");
var flktyCategory = new Flickity(category, {
  cellAlign: "left",
  contain: true,
  autoPlay: 2500,
  freeScroll: true,
  wrapAround: true,
  groupCells: true,
});
