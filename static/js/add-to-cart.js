import * as Util from './util.js';
function prepareToAdd() {
    /*
    Prepare all the neccesary data for adding to cart.
        :return orderStr: String - contains the product order data as JSON text.
    */
    const prodSeller = document.getElementsByClassName("prod-seller")[0].textContent;
    const prodName = document.getElementsByClassName("prod-name")[0].textContent;
    const prodDescription = document.getElementsByClassName("prod-description")[0].textContent;
    const discountedPrice = document.getElementsByClassName("discounted-price")[0].textContent;
    const discountPercentage = document.getElementsByClassName("discount-percentage")[0].textContent;
    const originalPrice = document.getElementsByClassName("original-price")[0].textContent;
    const orderQuantity = document.getElementsByClassName("order-quantity")[0].textContent;
    const orderStr = {
        prodSeller: prodSeller,
        prodName: prodName,
        prodDescription: prodDescription,
        discountedPrice: discountedPrice,
        discountPercentage: discountPercentage,
        originalPrice: originalPrice,
        orderQuantity: orderQuantity,
    }
    // Converts object to a string that follows JSON notation.
    return JSON.stringify(orderStr);
}
function addToLocalStorage(storageKey, orderStr) {
    /*
    Add order to local storage.
        :@param storageKey: String - the local storage key to be. 
        :@param orderStr: String - JSON string contains the data of the user order.
        :return undefined:
    */
   const storage = localStorage.getItem(storageKey);
    if (storage === null || storage === 'undefined') {
        // Set item for empty storage key
        const orderStrArr = JSON.stringify([orderStr]);
        localStorage.setItem(storageKey, orderStrArr);
    } else {
        const orderStrArr = localStorage.getItem(storageKey);
        // Convert JSON string to object
        const orderArr = JSON.parse(orderStrArr);
        // Check for duplicate order
        for (const idx of orderArr.keys()) {
            // Update order quantity
            const oldOrder = JSON.parse(orderArr[idx]); 
            const newOrder = JSON.parse(orderStr);
            // Check if product is the same
            if (oldOrder["prodName"] === newOrder["prodName"]) {
                newOrder["orderQuantity"] = Number(newOrder["orderQuantity"]) + Number(oldOrder["orderQuantity"]);
                newOrder["orderQuantity"] = String(newOrder["orderQuantity"]);
                // remove old entry in local storage
                localStorage.removeItem(storageKey);
                // remove and replace array entry
                orderArr.splice(idx, 1, JSON.stringify(newOrder));
            }
            // New order
            else {
                // Add new cart order to array
                orderArr.push(orderStr);
            }
        }
        // Convert order array back to JSON string format
        const orderUpdatedArr = JSON.stringify(orderArr);  
        // Update order in local storage
        localStorage.setItem(storageKey, orderUpdatedArr);
    }
}
function toggleCartBadge(targetParent, hasEntries, cartContent) {
    /*
    Toggle the header cart badge.
        :@param targetParent: Object - parent object of target badge element.
        :@param hasEntries: Boolean - whether the cart has records.
        :@param cartContent: JSON - cart records in JSON format.
        :return undefined:
    */
    if (hasEntries && cartContent !== 'undefined') {
        const badge = targetParent.getElementsByClassName('badge')[0];
        badge.classList.toggle('d-none');
    }
}
function addToggleCartBoxListener(clickHandler) {
    /*
    Add listener that displays the cart items list when clicking header cart icon
        :return undefined:
    */
    const headerCartIcon = document.getElementsByClassName('header-cart-btn')[0];
    headerCartIcon.addEventListener('click', clickHandler);
}
function toggleCartBoxHandler() {
    /*
    Toggle the cart items list
    */
    const cartItemsList = document.getElementsByClassName('cart-box')[0];;
    cartItemsList.classList.toggle('d-none');
}
function updateCartItemCount(targetParent, hasEntries, cartContent) {
    /*
    Update the cart item count.
        :@param targetParent: Object - parent object of target badge element.
        :@param hasEntries: Boolean - can be true or false.
        :@param cartContent: JSON - contains the cart data.
    */
    if (hasEntries && cartContent !== 'undefined') {
        const badge = targetParent.getElementsByClassName('badge')[0];
        const cartDataArr = JSON.parse(cartContent);
        const cartCount = cartDataArr.length;
        badge.innerHTML = cartCount;
    }
}
function createCartItem(THUMBNAIL_SRC, prodName, discountedPrice, orderQuantity) {
    /*
    Html element template for a cart item.
        :@param THUMBNAIL_SRC: String - file path of product thumbnail.
        :@param prodName: String - product name.
        :@param discountedPrice: String - current price.
        :@param orderQuantity: String - order quantity.
        :return cartItem: Object - cart item element created.
    */
    // Cart Items Details Box and Wrapper
    const cartItemsDetailsBox = document.createElement('div');
    cartItemsDetailsBox.setAttribute('class', 'row cart-item-details-box');
    // Cart Items Details
    // Thumbnail
    const cartItemsThumbnailBox = document.createElement('div');
    cartItemsThumbnailBox.setAttribute('class', 'col-4 thumbnail-box');
    const cartItemsThumbnail = document.createElement('img');
    cartItemsThumbnail.setAttribute('class', 'img-fluid rounded');
    cartItemsThumbnail.setAttribute('src', THUMBNAIL_SRC);
    cartItemsThumbnailBox.appendChild(cartItemsThumbnail);
    cartItemsDetailsBox.appendChild(cartItemsThumbnailBox);
    // Details Box
    const cartItemsDetailsTextBox = document.createElement('div');
    cartItemsDetailsTextBox.setAttribute('class', 'col-8 details-box');
    cartItemsDetailsBox.appendChild(cartItemsDetailsTextBox);
    // Details Text Wrapper
    const detailsTextWrapper = document.createElement('div');
    detailsTextWrapper.setAttribute('class', 'details-text-wrapper');
    cartItemsDetailsTextBox.appendChild(detailsTextWrapper);
    // Product Name
    const cartItemsDetailsProductNameBox = document.createElement('div');
    cartItemsDetailsProductNameBox.setAttribute('class', 'cart-item-product-name-box');
    const productNameText = document.createElement('p');
    productNameText.innerHTML = prodName;
    cartItemsDetailsProductNameBox.appendChild(productNameText);
    detailsTextWrapper.appendChild(cartItemsDetailsProductNameBox);
    // Price Info Box
    const priceInfoBox = document.createElement('div');
    priceInfoBox.setAttribute('class', 'price-info-box');
    detailsTextWrapper.appendChild(priceInfoBox);
    const priceInfo = document.createElement('span');
    priceInfo.innerHTML = `$${discountedPrice}.00 x ${orderQuantity}`;
    priceInfo.setAttribute('class', 'cart-item-price-info');
    priceInfoBox.appendChild(priceInfo);
    const total = document.createElement('span');
    total.setAttribute('class', 'cart-item-total')
    total.innerHTML = `$${discountedPrice * orderQuantity}.00`; 
    priceInfoBox.appendChild(total);
    // Delete Cart Item Box
    const deleteCartItemBox = document.createElement('div');
    deleteCartItemBox.setAttribute('class', 'delete-cart-item-box')
    const deleteCartIcon = document.createElement('img');
    deleteCartIcon.setAttribute('src', './images/icon-delete.svg');
    deleteCartIcon.setAttribute('alt', 'Delete cart item icon')
    deleteCartItemBox.appendChild(deleteCartIcon);
    cartItemsDetailsTextBox.appendChild(deleteCartItemBox);

    return cartItemsDetailsBox;
}
function appendCartItems(targetParent, hasEntries, cartContent) {
    /*
    Append all cart item to the parent element.
        :@param targetParent: Object - element where the cart items will be appended.
        :@param cartItem: Object - a json string that contains the cart items data.
        :return undefined:
    */
    
   if (hasEntries && cartContent !== 'undefined') {
        const cartItemsArr = JSON.parse(cartContent);
        for (let cartItemStr of cartItemsArr) {
            const { prodName, discountedPrice , orderQuantity} = JSON.parse(cartItemStr);
            // Process discounted price string
            const regex = /[0-9]+.\d{2}/g;
            const numDiscountedPrice = Number(discountedPrice.match(regex)[0]);
            const numOrderQuantity = Number(orderQuantity);
            const THUMBNAIL_SRC = `./images/image-product-1-thumbnail.jpg`;
            targetParent.appendChild(createCartItem(THUMBNAIL_SRC, prodName, numDiscountedPrice, numOrderQuantity));
        }
    }
}
function checkCartHandler() {
    /*
    Event Handler for checking the cart storage entries and adding cart items.
        :return undefined:
    */
    // Check storage
    const [hasEntries, cartContent] = Util.checkCart("storageCart");
    if (hasEntries) {
        // Toggle badge display
        const headerCartBtn = document.getElementsByClassName('header-cart-btn')[0];
        toggleCartBadge(headerCartBtn, hasEntries, cartContent);
        // Toggle empty cart alert.
        Util.toggleCartAlert('alert-cart-empty', hasEntries, cartContent)
        // Update the badge number
        updateCartItemCount(headerCartBtn, hasEntries, cartContent);
        // Generate cart items
        const cartItemsParent = document.getElementsByClassName("cart-items-list")[0];
        appendCartItems(cartItemsParent, hasEntries, cartContent);
    }
}
function addCheckCartListener(loadHandler) {
    /*
    Add an event listener to the window object that checks for cart entries.
    :return undefined:
    */
    const target = document;
    target.addEventListener('DOMContentLoaded', loadHandler);
}
function addToCart() {
    /*
    Add product to cart.
    */
    const storageCartKey = "storageCart";
    const orderString = prepareToAdd();
    addToLocalStorage(storageCartKey, orderString);
}
export { addToCart, addCheckCartListener, checkCartHandler,
    addToggleCartBoxListener, toggleCartBoxHandler };