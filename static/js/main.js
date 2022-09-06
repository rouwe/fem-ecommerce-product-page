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
    Slider.addSliderButtonListener("lightbox-showcase", "prev-btn", "next-btn", Slider.sliderButtonHandler);
    // Add event listener to lightbox close button
    Slider.addCloseLightBoxListener("lightbox-showcase", "close-lightbox-btn", Slider.closeLightBoxHandler);
    // Add event listener to preview product gallery thumbnails
    Slider.addProductGalleryListener(["static-prod-gallery", "lightbox-prod-gallery"], Slider.productGalleryHandler);
    // Add event listener to lightbox close button
    Slider.addCloseLightBoxListener("lightbox-showcase", "close-lightbox-btn", function () {});
});