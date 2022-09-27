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
    console.log(localStorage.getItem(storageCartKey))
    console.log('Cart Updated')
}
export { checkCart, updateCart };