var splideHeader = new Splide(".splide", {
  type: "loop",
  perPage: 1,
  autoplay: true,
  interval: 3000,
  arrows: false,
});

splideHeader.mount();

//
let buy = document.querySelector(".buy");
let remove = document.querySelector(".remove");
let bottom = document.querySelector(".bottom");

buy.addEventListener("click", function () {
  bottom.classList.add("clicked");
  console.log(remove);
});

remove.addEventListener("click", function () {
  bottom.classList.remove("clicked");
});
