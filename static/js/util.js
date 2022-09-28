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
function updateCart(storageCartKey, content) {
    /*
    Update cart entries.
        :@param storageCartKey: String - key for accesing cart storage.
        :@param content: JSON - updated entries content.
    */
    localStorage.setItem(storageCartKey, content);
}
function displayCheckoutBtn(targetClass='checkout-btn', action) {
    /*
    Display cart checkout button depending on action.
        :@param targetClass: String - button element to toggle.
        :@param action: Boolean - display if true else hide.
        :return undefined: 
    */

    const checkoutBtn = document.getElementsByClassName(targetClass)[0];
    checkoutBtn.classList.toggle('d-none');
}
function toggleCartAlert(targetClass='alert-cart-empty', hasEntries, cartContent) {
    /*
    Toggle empty cart alert.
        :@param targetClass: String - span element to toggle.
        :@param hasEntries: Boolean - whether the cart has records.
        :@param cartContent: JSON - cart records in JSON format.
        :return undefined:
    */
    const emptyCartTextElement = document.getElementsByClassName(targetClass)[0];
    if (hasEntries && cartContent === 'undefined') {
        emptyCartTextElement.classList.toggle('d-none');
        // Toggle checkout button
        displayCheckoutBtn('checkout-btn');
    }
}
export { checkCart, updateCart, toggleCartAlert };