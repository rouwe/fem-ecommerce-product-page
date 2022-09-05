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
function sliderButtonHandler () {
    /*
    Handles the prev and next slider events.
        :@param previewSources: Object - contains the product img preview sources. 
        :return undefined:
    */
   const [staticShowcaseClass, lightBoxShowcaseClass, previewClass] = ["static-showcase", "lightbox-showcase", "preview-img"];
   const staticContainer = document.getElementsByClassName(staticShowcaseClass)[0];
   const lightBoxContainer = document.getElementsByClassName(lightBoxShowcaseClass)[0];
   const staticPreview = staticContainer.getElementsByClassName(previewClass)[0]
   const lightBoxPreview = lightBoxContainer.getElementsByClassName(previewClass)[0];
   let getSource = lightBoxPreview.getAttribute("src");
   const regExp = /\d[$.]/; // pattern to look for preview source number
   const previewNumIndex = getSource.search(regExp);
   let previewNum = Number(getSource[regExp.exec(getSource)["index"]]);
   // check slider button type
   const isPrevButton = this.classList.contains("prev-btn");
   const isNextButton = this.classList.contains("next-btn");
   if (isPrevButton) {
    // Handles prev source
    if (previewNum === 1) {
        previewNum = 4;
    } else {
        previewNum -= 1;
    }
    } else if (isNextButton) {
        // Handles next source
        if (previewNum === 4) {
            previewNum = 1;
        } else {
            previewNum += 1;
        }
   }
   const newSource = `${getSource.slice(0, previewNumIndex)}${previewNum}${getSource.slice(previewNumIndex + 1)}`;
   staticPreview.setAttribute("src", newSource);
   lightBoxPreview.setAttribute("src", newSource);
}
function addProductGalleryListener(galleryClassArr, clickHandler) {
    /*
    Add event listeners for product gallery (both static and lightbox).
        :@param staticProdGalleryClass: String - the class selector of the static product gallery.
        :@param lightBoxProdGalleryClass: String - the class selector of the lightbox product gallery.
        :@param clickHandler: Function - the function to be used as event handler for both static and lightbox gallery.
        :return undefined:
    */
    for (const galleryClass of galleryClassArr) {
        const gallery = document.getElementsByClassName(galleryClass)[0].children;
        console.log(gallery)
        for (const thumbnailBox of gallery) {
            const thumbnail = thumbnailBox.children[0];
            thumbnail.addEventListener("click", clickHandler);
        }
    }
}
function productGalleryHandler () {
    console.log("change preview image please!");
}
function addCloseLightBoxListener(containerClass, closeButtonClass, clickHandler) {
    /*
    Add event listeners for lightbox close button.
        :@param containerClass: String - the class selector of the targeted element container.
        :@param closeButtonClass: String - the class selector of the close button element.
        :@param clickHandler: Function - the function be used as event handler.
        :return undefined:
    */
    const lightBoxContainer = document.getElementsByClassName(containerClass)[0];
    const closeLightBoxButton = lightBoxContainer.getElementsByClassName(closeButtonClass)[0];
    closeLightBoxButton.addEventListener("click", clickHandler);
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
    addCloseLightBoxListener, sliderButtonHandler, addProductGalleryListener,
    productGalleryHandler }
