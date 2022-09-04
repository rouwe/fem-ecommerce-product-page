function addSliderButtonListener(containerClass, prevClass, nextClass, clickHandler) {
    /*
    Add event listeners for slider buttons.
        :@param parentClass: String - the class selector of the targeted buttons.
        :@param prevClass: String - the class selector of the prev button element.
        :@param nextClass: String - the class selector of the next button element.
        :@param clickHandler: Function - the function to be used
        :return undefined:
    */
    const lightBoxContainer = document.getElementsByClassName(containerClass)[0];
    const prevButton = lightBoxContainer.getElementsByClassName(prevClass)[0];
    const nextButton = lightBoxContainer.getElementsByClassName(nextClass)[0];
    const sliderNavigator = [prevButton, nextButton];
    for (const navigator of sliderNavigator) {
        navigator.addEventListener("click", clickHandler)
    }
}
function previewSlider(productPreviewSrcObj) {
    /* 
    Changes the product preview when the prev or next button is clicked.
        :@param productPreviewSrcObj: Object - contains all product image and its sources.
        :return undefined:
    */
}
export { previewSlider, addSliderButtonListener }
