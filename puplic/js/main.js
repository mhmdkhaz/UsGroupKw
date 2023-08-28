// ---------------------------------------------------- start shared functions -------------------------------------------------------

// function main
function close(element, direction, valueDirection, overlay) {
  element.style[direction] = `${valueDirection}%`;
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 500);
}

function open(element, direction, valueDirection, overlay) {
  element.style[direction] = `${valueDirection}%`;
  overlay.style.display = "block";
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 200);
}

function funMinsPlus(qytCount, operation) {
  if (operation === "+") {
    qytCount.textContent = parseInt(qytCount.textContent) + 1;
  } else if (operation === "-") {
    if (qytCount.textContent > 1) {
      qytCount.textContent = parseInt(qytCount.textContent) - 1;
    }
  }
}
// function main

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
  open(detailsCart, "right", 0, overlay);
});

closeCart.addEventListener("click", () => {
  close(detailsCart, "right", -100, overlay);
});

//add to cart

let addToCartButtons = document.querySelectorAll(
  ".product-card-container .add-to-cart"
);
let selectedProducts = []; // مصفوفة تحتوي على العناصر التي تم الضغط عليها

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => addToCart(button));
});

function addToCart(button) {
  const productContainer = button.closest(".productElement");
  const productName =
    productContainer.querySelector(".product-name").textContent;
  const productPrice = productContainer.querySelector(
    ".product-price span"
  ).textContent;
  const productImg = productContainer.querySelector(".img").src;

  // function add id to element to filter elements
  addIdToProduct();
  const dataId = productContainer.dataset.id;
  // add element if exists or not
  filterProdcut(dataId, productName, productPrice, productImg);

  minsPlusNumberCount(productPrice);
  TotalpricePrduct(productPrice, dataId);
  deletElementCart();
  counterCart();
}

function minsPlusNumberCount(productPrice) {
  let minsCart = document.querySelectorAll(".infoProduct .mins");
  let plusCart = document.querySelectorAll(".infoProduct .plus");

  plusCart.forEach((plusBtn) => {
    plusBtn.addEventListener("click", () => {
      let qty = plusBtn.parentNode.querySelector(".numberQty");
      let apperentElement = plusBtn.closest(".elementCart");
      let newPrice = apperentElement.querySelector(".priceFromCart span");
      newPrice.textContent = qty.textContent * parseFloat(productPrice);
      funMinsPlus(qty, "+");
    });
  });

  minsCart.forEach((minsBtn) => {
    minsBtn.addEventListener("click", () => {
      let qty = minsBtn.parentNode.querySelector(".numberQty");
      let apperentElement = minsBtn.closest(".elementCart");
      let newPrice = apperentElement.querySelector(".priceFromCart span");
      newPrice.textContent = qty.textContent * parseFloat(productPrice);
      funMinsPlus(qty, "-");
    });
  });
}

function TotalpricePrduct(productPrice, dataId) {
  let idElements = document.querySelectorAll(".elementCart");
  idElements.forEach((element) => {
    if (element.dataset.id === dataId) {
      let newPrice = element.querySelector(".priceFromCart span");
      let newQty = element.querySelector(".numberQty").textContent;

      newPrice.textContent = newQty * parseFloat(productPrice);
    }
  });
}
TotalpricePrduct();

// function totalPriceOperation() {
//   let qtyElements = document.querySelectorAll(".TotalPriceprice");
//   let totalPrice = 0;

//   qtyElements.forEach((qtyElement) => {
//     let numberQty = parseInt(qtyElement.textContent);
//     let unitPrice = parseFloat(priceElement.textContent);
//     // console.log(priceElement.textContent);
//     let productPrice = numberQty * unitPrice;
//     totalPrice += productPrice;
//   });

//   console.log("Total price: " + totalPrice);
// }

// totalPriceOperation();

function deletElementCart() {
  let deleteButtons = document.querySelectorAll(".elementCart .delete");

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      let elementCart = deleteBtn.closest(".elementCart");
      elementCart.style.opacity = "0";
      elementCart.style.height = "0";
      elementCart.style.padding = "0";
      elementCart.style.margin = "0";
      setTimeout(() => {
        elementCart.remove();
      }, 500);

      // check count element
      deleteIdToArray(elementCart);
      counterCart();
      // console.log("d");
    });
  });
}
deletElementCart();

function counterCart() {
  let apperentCart = document.querySelector(".infoProduct");
  let emptyCart = document.querySelector(".emptyCart");

  if (selectedProducts.length === 0) {
    emptyCart.style.display = "block";
    apperentCart.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    apperentCart.style.display = "block";
  }
}

function addIdToProduct() {
  let productElement = document.querySelectorAll(".productElement");
  productElement.forEach((product, index) => {
    product.setAttribute("data-id", index);
  });
}

function deleteIdToArray(elementCart) {
  selectedProducts = selectedProducts.filter(
    (p) => p !== elementCart.dataset.id
  );
}

function filterProdcut(dataId, productName, productPrice, productImg) {
  let arrayFilterIndex = selectedProducts.includes(dataId);
  let infoProductCart = document.querySelectorAll(".infoProduct");
  let elementFromCart = document.querySelectorAll(".elementCart");

  if (arrayFilterIndex === true) {
    elementFromCart.forEach((product) => {
      if (product.dataset.id === dataId) {
        let numberQtyInput = product.querySelector(".numberQty");
        numberQtyInput.textContent = parseInt(numberQtyInput.textContent) + 1;
      }
    });
  } else {
    selectedProducts.push(dataId);

    infoProductCart.forEach((cart) => {
      cart.innerHTML += `
        <div class="elementCart flex mt-2" data-id="${dataId}">
          <figure class="relative lg:w-1/4 w-[40%] mr-4">
            <img src="${productImg}" class="rounded h-full w-full" alt="" />
            <span class="delete flex justify-center items-center absolute top-0 left-0 w-full h-full text-white">
              <i class="fa-solid fa-xmark"></i>
            </span>
          </figure>
          <div class="info w-3/5 lg:w-3/4">
            <h2 class="capitalize truncate text-sm text-hea mt-1">
              ${productName}
            </h2>
            <p class="priceFromCart capitalize text-sm text-gray-400 mb-2.5">
              unit price: <span>${productPrice}</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <div class="flex qty h-9">
                <button class="px-2 py-1 rounded-l-md mins">-</button>
                <span class="flex justify-center items-center w-11 text-center numberQty">1</span>
                <button class="px-2 py-1 rounded-r-md plus">+</button>
              </div>
              <div class="TotalPriceprice">
                <h2 class="text-sm font-semibold leading-5 md:text-base text-heading">
                  $60.00
                </h2>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
}

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

// slider header
const slides = document.querySelectorAll("[data-slide]");
const buttons = document.querySelectorAll("[data-button]");

let currSlide = 0;
let maxSlide = slides.length - 1;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const updateCarousel = () => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100 - currSlide * 100}%)`;
  });
};

const touchStart = (index) => (e) => {
  isDragging = true;
  startPos = getPositionX(e);
  currentTranslate = prevTranslate;
};

const touchMove = (e) => {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  const move = currentPosition - startPos;
  prevTranslate = currentTranslate + move;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${
      index * 100 - currSlide * 100 + prevTranslate
    }%)`;
  });
};

const touchEnd = () => {
  isDragging = false;
  const movedBy = prevTranslate - currentTranslate;
  if (movedBy < -100 && currSlide < maxSlide) {
    currSlide++;
  }
  if (movedBy > 100 && currSlide > 0) {
    currSlide--;
  }
  updateCarousel();
};

const getPositionX = (e) => {
  return e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
};

slides.forEach((slide, index) => {
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("touchmove", touchMove);
  slide.addEventListener("mousemove", touchMove);
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset.button === "next" ? ++currSlide : --currSlide;

    if (currSlide > maxSlide) {
      currSlide = 0;
    } else if (currSlide < 0) {
      currSlide = maxSlide;
    }

    updateCarousel();
  });
});

updateCarousel();

// end in slider header

var category = document.querySelector(".carouselCategory");
var flktyCategory = new Flickity(category, {
  cellAlign: "left",
  contain: true,
  autoPlay: 5500,
  freeScroll: true,
  wrapAround: true,
  groupCells: true,
  groupCells: 4,
});

// start in details product

let productDetails = document.querySelector(".productDetails");
let plus = document.querySelector(".plus");
let mins = document.querySelector(".mins");
let qty = document.querySelector(".numberQty");

if (productDetails) {
  /*
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
    totalPriceElem.textContent = `d.k${totalPrice}`;
  };

  addEventOnElem(qtyPlusBtn, "click", increaseProductQty);

  const decreaseProductQty = function () {
    if (qtyProdcut > 1) qtyProdcut--;
    totalPrice = qtyProdcut * priceProduct;

    qtyElem.textContent = qtyProdcut;
    totalPriceElem.textContent = `d.k${totalPrice}`;
  };

  addEventOnElem(qtyMinusBtn, "click", decreaseProductQty);
}
// end in details product

// --------------------------------------- start in show all proudct ---------------------------------------
var fixedElement = document.getElementById("fixed-element");
var filterElemetn = document.querySelector(".filterElement");
if (fixedElement) {
  window.addEventListener("scroll", function () {
    var footer = document.querySelector("footer");
    var fixedElementHeight = fixedElement.offsetHeight;
    var footerOffset = footer.offsetTop;

    var scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition + fixedElementHeight + 100 >= footerOffset) {
      fixedElement.style.position = "absolute";
      fixedElement.style.top = "";
      fixedElement.style.bottom = "0";
    } else {
      fixedElement.style.position = "fixed";
      fixedElement.style.top = "";
      fixedElement.style.bottom = "";
    }
    if (scrollPosition === 0) {
      fixedElement.style.position = "absolute";
      fixedElement.style.top = "0";
      fixedElement.style.bottom = "";
    }
  });
}
//filter element close and open in mopile
let filterElement = document.querySelector(".filterElement");
let closeFilter = document.querySelector(".closeFilter i");
let opneFilter = document.querySelector(".opneFilter span");
let overlayShowProduct = document.querySelector(".overlayShowProduct");

if (filterElement) {
  opneFilter.addEventListener("click", () => {
    open(filterElement, "bottom", 0, overlayShowProduct);
  });

  closeFilter.addEventListener("click", () => {
    close(filterElement, "bottom", -100, overlayShowProduct);
  });
}

//---------------------------------------  end in show all proudct ---------------------------------------
