import * as Slider from './preview-slider.js'
import * as prodDataFetcher from './fetch-product.js'
import { addToCart } from './add-to-cart.js';

// Get test product
const url = "./", testDirectory = "static/js/product.json";
const prodDataPromise = prodDataFetcher.getProductObj(url, testDirectory);
prodDataPromise.then((getData) => {
    // 
    const {productSeller, productName, productDescription, priceInfo,
    previewSources} = getData["product"];
    // Set default img source of product preview and lightbox preview
    const defaultNumSrc = 1; // default preview source number
    const defaultPreviewSrc = previewSources[`preview${defaultNumSrc}`]["full"];
    Slider.setDefaultPreviewSrc("preview-img", defaultPreviewSrc);
    // Add event listener to preview buttons
    Slider.addSliderButtonListener("lightbox-showcase", "prev-btn", "next-btn", Slider.sliderButtonHandler);
    // Add event listener to lightbox close button
    Slider.addCloseLightBoxListener("lightbox-showcase", "close-lightbox-btn", Slider.closeLightBoxHandler);
    // Add event listener to preview product gallery thumbnails
    Slider.addProductGalleryListener(["static-prod-gallery", "lightbox-prod-gallery"], Slider.productGalleryHandler);
});
// Add event listener to order quanity increase and decrease button
const decreaseOrder = document.getElementsByClassName("quantity-reduce")[0];
const increaseOrder = document.getElementsByClassName("quantity-add")[0];
// Decrease order quantity event
decreaseOrder.addEventListener("click", (e) => {
    const orderQuantityElement = document.getElementsByClassName("order-quantity")[0];
    const orderQuantity = Number(orderQuantityElement.innerHTML);
    if (orderQuantity > 0) {
        const newQuantity = orderQuantity - 1;
        orderQuantityElement.innerHTML = newQuantity;
    }
})
// Increase order quantity event
increaseOrder.addEventListener("click", (e) => {
    const orderQuantityElement = document.getElementsByClassName("order-quantity")[0];
    const orderQuantity = Number(orderQuantityElement.innerHTML);
    const newQuantity = orderQuantity + 1;
    orderQuantityElement.innerHTML = newQuantity;
})
// Add event listener to add to cart button
const orderButton = document.getElementsByClassName("cart-btn")[0];
orderButton.addEventListener("click", addToCart);