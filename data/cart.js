export let cart = JSON.parse(localStorage.getItem('cart'));
 if (!cart) {
    cart = [{
            //some default values
            //this is call Normalizing the Data
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
 }

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItems;
  
          cart.forEach((cartItem) => {
              if(productId === cartItem.productId) {
                  matchingItems = cartItem;
              }
          });
  
          const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
          // the class used in the "select" element is product.id but here must be productId
          const quantity = Number(quantitySelector.value);
  
          if (matchingItems) {
              matchingItems.quantity += quantity;
          } else {
              cart.push({
                  productId,
                  quantity,
                  deliveryOptionId: '1'
              });
          };

          saveToStorage();
}

  // I missed the parameter lol
export function removeFromCart(productId) {
    const newCart = [];
    
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
    // I missed the return lol
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
  }

//   localStorage only save strings
//   stringify to convert string
//   parse to convert to what it was, in this case
//   an array