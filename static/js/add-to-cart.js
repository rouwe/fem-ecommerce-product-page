function prepareToAdd() {
    /*
    Prepare all the neccesary data for adding to storage.
    */
    const prodSeller = document.getElementsByClassName("prod-seller")[0];
    const prodName = document.getElementsByClassName("prod-name")[0];
    const prodDescription = document.getElementsByClassName("prod-description")[0];
    const discountedPrice = document.getElementsByClassName("discounted-price")[0];
    const discountPercentage = document.getElementsByClassName("discount-percentage")[0];
    const originalPrice = document.getElementsByClassName("original-price")[0];
    const orderQuantity = document.getElementsByClassName("order-quantity")[0];
    const orderObj = {
        prodSeller: prodSeller,
        prodName: prodName,
        prodDescription: prodDescription,
        discountedPrice: discountedPrice,
        discountPercentage: discountPercentage,
        originalPrice: originalPrice,
        orderQuantity: orderQuantity,
    }
    return orderObj;
}
function addToCart() {
    /*
    Add product to cart.
    */
    const orderObj = prepareToAdd();
    console.log(orderObj);
    return false;
}
export { addToCart };