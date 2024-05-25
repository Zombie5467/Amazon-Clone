import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// import { updateCartQuantity } from "./checkout.js";

let productsHTML = ''

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img title="image" class="product-image"
        src=${product.image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${product.name}
    </div>

    <div class="product-rating-container">
      <img title="image" class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
        $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart js-added-to-cart-${product.id}">
    <img title="image" src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
    Add to Cart
  </button>
</div>
    `
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;


const cartQuantity = calculateCartQuantity();

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let addedMessageTimeoutId;
    
    button.addEventListener('click', () => {
        const {productId} = button.dataset;
        addToCart(productId);
        calculateCartQuantity()
        // updateCartQuantity()

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

        addedMessage.classList.add('added-to-cart-visible');

        // so when we click 'add to car', it refreshes the 2 second wait time
        if(addedMessageTimeoutId) {
          clearTimeout(addedMessageTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000)

        // Save the timeoutId so we can stop it later.
        addedMessageTimeoutId = timeoutId
        // console.log(cartQuantity);
        // console.log(cart);
    });
});