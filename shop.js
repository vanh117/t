// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// closeCart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//cartworking js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//making function
function ready() {
  //remove item
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // quantity change
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  let addCart = document.getElementsByClassName("bxs-cart-add");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    console.log(button);
    button.addEventListener("click", addCartClicked);
  }
  //buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//buy button
function buyButtonClicked() {
  alert("Đơn hàng đã được nhận");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}
//remove item from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
//add to cart
function addCartClicked(event) {
  console.log("Hi");
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  //cartShopBox.classList.add('cart-box')
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Bạn đã có sản phẩm này trong giỏ đồ");
      return;
    }
  }

  let cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
  <div class="cart-product-title">${title}
    
  </div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1"  class="cart-quantity" />

</div>
<!-- remove-cart -->
<i class='bx bxs-trash cart-remove'></i>
 `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);

  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
// let cartBoxContent = `
// <img src="${productImg}" alt="" class="cart-img">
// <div class="detail-box">
//   <div class="cart-product-title">${title}

//   </div>
//   <div class="cart-price">${price}</div>
//   <input type="number" value="1"  class="cart-quantity" />

// </div>
// <!-- remove-cart -->
// <i class='bx bxs-trash cart-remove'></i>
//  `;
// cartShopBox.innerHTML = cartBoxContent;
// cartItems.append(cartShopBox);
// cartShopBox
//   .getElementsByClassName("cart-remove")[0]
//   .addEventListener("click", removeCartItem);

// cartShopBox
//   .getElementsByClassName("cart-quantity")[0]
//   .addEventListener("change", quantityChanged);
//quantity changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
//update item
function updatetotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];

  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    console.log(priceElement);
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let quantity = quantityElement.value;
    total = total + price * quantity;
    console.log(total);
  }

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
