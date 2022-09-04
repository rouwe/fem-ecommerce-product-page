function addSliderButtonListener(containerClass, prevClass, nextClass, clickHandler) {
    /*
    Add event listeners for slider buttons.
        :@param containerClass: String - the class selector of the targeted elements container.
        :@param prevClass: String - the class selector of the prev button element.
        :@param nextClass: String - the class selector of the next button element.
        :@param clickHandler: Function - the function to be used as event handler.
        :return undefined:
    */
    const lightBoxContainer = document.getElementsByClassName(containerClass)[0];
    const prevButton = lightBoxContainer.getElementsByClassName(prevClass)[0];
    const nextButton = lightBoxContainer.getElementsByClassName(nextClass)[0];
    const sliderNavigator = [prevButton, nextButton];
    for (const navigator of sliderNavigator) {
        navigator.addEventListener("click", clickHandler);
    }
}
function addCloseLightboxListener(containerClass, closeButtonClass, clickHandler) {
    /*
    Add event listeners for lightbox close button.
        :@param containerClass: String - the class selector of the targeted element container.
        :@param closeButtonClass: String - the class selector of the close button element.
        :@param clickHandler: Function - the function be used as event handler.
    */
    const lightBoxContainer = document.getElementsByClassName(containerClass)[0];
    const closeLightBoxButton = lightBoxContainer.getElementsByClassName(closeButtonClass)[0];
    document.addEventListener("click", clickHandler);
}
function setDefaultPreviewSrc(previewImgClass, defaultPreviewSrc) {
    /*
    Sets the default image source of preview element
        :@param previewImgClass: String - the class selector of the img elements.
        :@param defaultPreviewSrc: String - the product first image source to be used as default.
        :return undefined:
    */
    const previewImgArr = document.getElementsByClassName(previewImgClass);
    for (const preview of previewImgArr) {
        preview.setAttribute("src", defaultPreviewSrc); 
    }
}
function previewSlider(productPreviewSrcObj) {
    /* 
    Changes the product preview when the prev or next button is clicked.
        :@param productPreviewSrcObj: Object - contains all product image and its sources.
        :return undefined:
    */
}
export { previewSlider, addSliderButtonListener, setDefaultPreviewSrc,
    addCloseLightboxListener }
