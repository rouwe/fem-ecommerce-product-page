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
    if (localStorage.getItem(storageKey) === null) {
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
function checkCart(storageCartKey="storageCart") {
    /*
    Checks if the cart has entries.
        :@param storageCartKey: String - a key to access the cart storage.
        :return Array: returns a Boolean and a json string.
    */
    const cartContent = localStorage.getItem(storageCartKey);
    let hasEntries = false;
    if (cartContent) {
        hasEntries = true;
    }
    return [hasEntries, cartContent];
}
function toggleCartBadge(targetParent) {
    /*
    Toggle the header cart badge.
        :@param targetParent: Object - parent object of target badge element.
        :return undefined:
    */
    let badge = targetParent.getElementsByClassName('badge')[0];
    badge.classList.toggle('d-none');
}
function updateCartItemCount(targetParent, cartContent) {
    /*
    Update the cart item count.
        :@param targetParent: Object - parent object of target badge element.
        :@param cartContent: JSON - contains the cart data.
    */
    const badge = targetParent.getElementsByClassName('badge')[0];
    const cartDataArr = JSON.parse(cartContent);
    const cartCount = cartDataArr.length;
    badge.innerHTML = cartCount;
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
    // Cart Item
    const cartItemBox =  document.createElement("div");
    cartItemBox.setAttribute("class", "flex-row justify-content-stretch cart-item-box");
    // Thumbnail
    const cartItemThumbnail = document.createElement("img");
    cartItemThumbnail.setAttribute("src", THUMBNAIL_SRC);
    cartItemThumbnail.setAttribute("class", "img-fluid");
    cartItemBox.appendChild(cartItemThumbnail);
    // Details Box
    const orderDetailsBox = document.createElement("div");
    orderDetailsBox.setAttribute("class", "order-details-box");
    cartItemBox.appendChild(orderDetailsBox);
    // Product Name
    const prodNameElement = document.createElement("p");
    prodNameElement.innerHTML = prodName;
    prodNameElement.setAttribute("class", "cart-item-name");
    orderDetailsBox.appendChild(prodNameElement);
    // Price Details
    const priceDetailsElement = document.createElement("p");
    priceDetailsElement.setAttribute("class", "price-details");
    orderDetailsBox.appendChild(priceDetailsElement);
    const priceDetailsExpressionElement = document.createElement("span");
    priceDetailsExpressionElement.innerHTML = `${discountedPrice}x${orderQuantity}`;
    priceDetailsElement.appendChild(priceDetailsExpressionElement);
    const priceDetailsTotalElement = document.createElement("span");
    priceDetailsTotalElement.innerHTML = `${discountedPrice * orderQuantity}`;
    priceDetailsElement.appendChild(priceDetailsTotalElement);
    
    // Delete Cart item button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn delete-item-btn");
    // Delete Icon
    const deleteIconSvg = document.createElement("svg");


    
    deleteButton.append(deleteIconSvg)
    // Cart Item Details
    return cartItemBox;
}
function appendCartItems(targetParent, cartContent) {
    /*
    Append all cart item to the parent element.
        :@param targetParent: Object - element where the cart items will be appended.
        :@param cartItem: Object - a json string that contains the cart items data.
        :return undefined:
    */
    
    const cartItemsArr = JSON.parse(cartContent);
    for (let cartItemStr of cartItemsArr) {
        const { prodName, discountedPrice , orderQuantity} = JSON.parse(cartItemStr);
        // Process discounted price string
        const regex = /[0-9]+.\d{2}/g;
        const numDiscountedPrice = Number(discountedPrice.match(regex)[0]);
        const numOrderQuantity = Number(orderQuantity);
        console.log(numDiscountedPrice)
        const THUMBNAIL_SRC = `./images/image-product-1-thumbnail.jpg`;
        targetParent.appendChild(createCartItem(THUMBNAIL_SRC, prodName, numDiscountedPrice, numOrderQuantity));
    }
}
function checkCartHandler() {
    /*
    Event Handler for checking the cart storage entries and adding cart items.
        :return undefined:
    */
    // Check storage
    const [hasEntries, cartContent] = checkCart("storageCart");
    console.log(JSON.parse(cartContent))
    if (hasEntries) {
        // Toggle badge display
        const headerCartBtn = document.getElementsByClassName('header-cart-btn')[0];
        toggleCartBadge(headerCartBtn);
        // Update the badge number
        updateCartItemCount(headerCartBtn, cartContent);
        // Generate cart items
        const cartItemsParent = document.getElementsByClassName("cart-items-list")[0];
        appendCartItems(cartItemsParent, cartContent);
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
export { addToCart, addCheckCartListener, checkCartHandler };