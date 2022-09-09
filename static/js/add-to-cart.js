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