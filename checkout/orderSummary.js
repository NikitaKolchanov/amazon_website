// import { cart, removeFromCart } from "scripts/cart.js";
// import { products } from "scripts/products.js";
// import { formatCurrency } from "utils/money.js";
// import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

// hello();

let cartHTML = "";

function renderOrderSummary() {
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs().add(deliveryOption.deliveryDays ,'days').format("dddd, MMMM D");

    cartHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                ${today}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.img}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct.id, cartItem.deliveryId)}
                </div>
              </div>
            </div>
    `
  });


  function deliveryOptionsHTML(matchingProductId, deliveryId) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const isChecked = deliveryOption.id === deliveryId;
      console.log(isChecked);
      const today = dayjs().add(deliveryOption.deliveryDays , "days").format("dddd, MMMM D");
      const priceString = deliveryOption.priceCents === 0 ? "FREE Shipping" : `$${deliveryOption.priceCents / 100}`;
      
      html += `
                  <div class="delivery-option js-delivery-option"

                  data-product-id="${matchingProductId}"
                  data-delivery-id="${deliveryOption.id}">

                    <input type="radio"
                      ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProductId}">
                    <div>
                      <div class="delivery-option-date">
                        ${today}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} - Shipping
                      </div>
                    </div>
                  </div>
      `
    });

    return html;
  }

  document.querySelector(".return-to-home-link").innerHTML = `${cart.length} items`;

  document.querySelector(".order-summary").innerHTML = cartHTML;

  // document.querySelectorAll(".js-delete-link").forEach((link) => {
  //   link.addEventListener("click", () => {
  //     console.log(link);
  //   }
  // 

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const objCart = document.querySelector(`.js-cart-item-container-${productId}`);
      const countItems = document.querySelector(".return-to-home-link");

      objCart.remove();
      removeFromCart(productId);
      countItems.textContent = `${cart.length} items`;

    });
  });


  document.querySelectorAll(".js-delivery-option").forEach((radioButton) => {
    radioButton.addEventListener("click", () =>  {
      // const {productId, deliveryId} = radioButton.dataset;
      const { productId, deliveryId } = radioButton.dataset;
      updateDeliveryOption(productId, deliveryId);
      // renderOrderSummary();
    });
  });

}

// renderOrderSummary();

