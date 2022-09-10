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
        :@param storageKey: String - the local storage key to be . 
        :@param orderStr: String - JSON string contains the data of the user order.
        :return undefined:
    */
    if (localStorage.getItem(storageKey) === null) {
        // Set item for empty storage key
        const orderStrArr = JSON.stringify([orderStr])
        localStorage.setItem(storageKey, orderStrArr)
    } else {
        const orderStrArr = localStorage.getItem(storageKey);
        // Convert JSON string to object
        const orderArr = JSON.parse(orderStrArr);
        // Check for duplicate order
        for (const idx of orderArr.keys()) {
            // Update order quantity
            const oldOrder = orderArr[idx]; 
            const newOrder = JSON.parse(orderStr);
            // Check if product is the same
            if (oldOrder["prodName"] === newOrder["prodName"]) {
                newOrder["orderQuantity"] += oldOrder["orderQuanity"];
                localStorage.removeItem(storageKey); // remove old entry in local storage
                orderArr.splice(idx, 1); // remove array entry
                console.log("Cart order quantity updated!", orderStr);
            }
        }
        // Add new cart order to array
        // orderArr.push(orderStr);
        // Convert order array back to JSON string format
        const orderUpdatedArr = JSON.stringify(orderArr);  
        // Update order in local storage
        localStorage.setItem(storageKey, orderUpdatedArr);
        // console.log(JSON.parse(localStorage.getItem(storageKey)));
    }
}
function addToCart() {
    /*
    Add product to cart.
    */
    const storageCartKey = "storageCart";
    const orderString = prepareToAdd();
    addToLocalStorage(storageCartKey, orderString)
}
export { addToCart };