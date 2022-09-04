import * as Slider from './preview-slider.js'
import * as prodDataFetcher from './fetch-product.js'

// Get test product
const testUrl = "http://127.0.0.1:5500/", testDirectory = "static/js/product.json";
const prodDataPromise = prodDataFetcher.getProductObj(testUrl, testDirectory);
prodDataPromise.then((getData) => {
    // 
    const {productSeller, productName, productDescription, priceInfo,
    previewSources} = getData["product"];
    // Set default img source of product preview and lightbox preview
    const defaultNumSrc = 1; // default preview source number
    const defaultPreviewSrc = previewSources[`preview${defaultNumSrc}`]["full"];
    Slider.setDefaultPreviewSrc("preview-img", defaultPreviewSrc);
    // Add event listener to preview buttons
    Slider.addSliderButtonListener("lightbox-showcase", "prev-btn", "next-btn", function () {
        console.log("Seller: ", productSeller, "|| Name: ", productName, "Caller: ", this);
    });
    // Add event listener to lightbox close button
    Slider.addCloseLightboxListener("lightbox-showcase", "close-lightbox-btn", function () {});
});
