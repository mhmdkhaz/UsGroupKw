// ---------------------------------------------------- start shared functions -------------------------------------------------------

// -------------------------------- back to top button -------------------------------
var backToTop = document.querySelector(".backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//----------------------------------------- end baxk to top ------------------------------------------------

// ------------------------------------------------ start in cart ------------------------------------------------
let detailsCart = document.querySelector(".detailsCart");
let openCart = document.querySelector(".openCart");
let closeCart = document.querySelector(".clsoeCart");
let overlay = document.querySelector(".overlay");

openCart.addEventListener("click", () => {
  detailsCart.style.right = "0";
  overlay.style.display = "block";
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 100);
});

closeCart.addEventListener("click", () => {
  detailsCart.style.right = "-100%";
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 500);
});

// ------------------------------------------------ end in cart ------------------------------------------------

// ------------------------------------------------ start in choose filter ------------------------------------------------
let borderBox = document.querySelectorAll(".checkElement .selectedItem");
if (borderBox) {
  borderBox.forEach((selected) => {
    selected.addEventListener("click", () => {
      borderBox.forEach((removeClassAll) => {
        removeClassAll.classList.remove("activeSize");
      });
      selected.classList.add("activeSize"); 
    });
  });
}
// ------------------------------------------------ end in choose filter ------------------------------------------------

// ----------------------------------------------------end shared functions -------------------------------------------------------

// استمع إلى النقر على زر "Add to Cart" على كل منتج
const addToCartButtons = document.querySelectorAll(
  ".product-card-container .add-to-cart"
);
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => addToCart(button));
});

function addToCart(button) {
  const productContainer = button.closest(".productAll");
  const productName =
    productContainer.querySelector(".product-name").textContent;
  const productPrice =
    productContainer.querySelector(".product-price").textContent;
  const productImg = productContainer.querySelector(".img").src;

  const product = {
    nameProduct: "",
    price: "",
    img: "",
  };

  product.nameProduct = productName;
  product.price = productPrice;
  product.img = productImg;

  console.log(product);

  let cart = localStorage.getItem("cart");
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart.push(product);

  const cartJson = JSON.stringify(cart);

  localStorage.setItem("cart", cartJson);
}
// slider header
let elem = document.querySelector(".main-carousel");
let itemMain = document.querySelectorAll(".heroSlider .carousel-cell");

if (elem) {
  let = new Flickity(elem, {
    cellAlign: "center",
    contain: true,
    autoPlay: 5500,
    freeScroll: true,
    wrapAround: true,
  });
}

if (itemMain.length <= 2) {
  itemMain.forEach((cellSlider) => {
    cellSlider.style.width = "100%";
  });
}

// end in slider header

var category = document.querySelector(".carouselCategory");
var flktyCategory = new Flickity(category, {
  cellAlign: "left",
  contain: true,
  autoPlay: 5500,
  freeScroll: true,
  wrapAround: true,
  groupCells: true,
});

// start in details product

let productDetails = document.querySelector(".productDetails");
let plus = document.querySelector(".plus");
let mins = document.querySelector(".mins");
let qty = document.querySelector(".numberQty");

if (productDetails) {
  plus.addEventListener("click", () => {
    qty.value = parseInt(qty.value) + 1;
  });

  mins.addEventListener("click", () => {
    if (qty.value > 1) {
      qty.value = parseInt(qty.value) - 1;
    }
  });

  /**
   * add event on element
   */

  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  };

  const slider = document.querySelector("[data-slider]");
  const nextBtn = document.querySelector("[data-next]");
  const prevBtn = document.querySelector("[data-prev]");

  // set the slider default position
  let sliderPos = 0;

  // set the number of total slider items
  const totalSliderItems = 4;

  // make next slide btn workable
  const slideToNext = function () {
    sliderPos++;
    slider.style.transform = `translateX(-${sliderPos}00%)`;

    sliderEnd();
  };

  addEventOnElem(nextBtn, "click", slideToNext);

  // make prev slide btn workable
  const slideToPrev = function () {
    sliderPos--;
    slider.style.transform = `translateX(-${sliderPos}00%)`;

    sliderEnd();
  };

  addEventOnElem(prevBtn, "click", slideToPrev);

  // check when slider is end then what should slider btn do
  function sliderEnd() {
    if (sliderPos >= totalSliderItems - 1) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }

    if (sliderPos <= 0) {
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.classList.remove("disabled");
    }
  }

  sliderEnd();

  /**
   * product quantity functionality
   */

  const totalPriceElem = document.querySelector("[data-total-price]");
  const qtyElem = document.querySelector("[data-qty]");
  const qtyMinusBtn = document.querySelector("[data-qty-minus]");
  const qtyPlusBtn = document.querySelector("[data-qty-plus]");
  const priceProduct = document.querySelector(".spanPrice").textContent;

  // set the product default quantity
  let qtyProdcut = 1;

  // set the initial total price
  let totalPrice = 125;

  const increaseProductQty = function () {
    qtyProdcut++;
    totalPrice = qtyProdcut * priceProduct;

    qtyElem.textContent = qtyProdcut;
    totalPriceElem.textContent = `d.k${totalPrice}.00`;
  };

  addEventOnElem(qtyPlusBtn, "click", increaseProductQty);

  const decreaseProductQty = function () {
    if (qtyProdcut > 1) qtyProdcut--;
    totalPrice = qtyProdcut * priceProduct;

    qtyElem.textContent = qtyProdcut;
    totalPriceElem.textContent = `$${totalPrice}.00`;
  };

  addEventOnElem(qtyMinusBtn, "click", decreaseProductQty);
}
// end in details product
