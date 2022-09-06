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
        for (const thumbnailBox of gallery) {
            const thumbnail = thumbnailBox.children[0];
            thumbnail.addEventListener("click", clickHandler);
        }
    }
}
function setThumbnailMode (eventCaller, staticShowcase, lightBoxShowcase) {
    /*
    Sets the thumbnail active on or off.
        :@param eventCaller: Object - HTML element that triggers the event.
        :@param staticShowcase: Object - the static showcase element.
        :@param lightBoxShowcase: Object - the lightbox showcase element.
        :return undefined:
    */
    const currentThumbnail = eventCaller;
    const currentThumbnailSrc = currentThumbnail.getAttribute("src");
    const currentParentShowcase = eventCaller.parentElement.parentElement.parentElement;
    // Gets the thumbnail that has the same source attribute as the event caller thumbnail 
    // (can come from either the static showcase or lightbox showcase).
    let oppositeShowcase;
    if (currentParentShowcase === staticShowcase) {
        oppositeShowcase = lightBoxShowcase;
    } else {
        oppositeShowcase = staticShowcase;
    }
    let oppositeThumbnail;
    const oppositeThumnbnailArr = oppositeShowcase.getElementsByClassName("img-thumbnail");
    for (const tempOppositeThumbnail of oppositeThumnbnailArr) {
        const oppositeThumbnailSrc = tempOppositeThumbnail.getAttribute("src")
        // compare img source attribute
        if (currentThumbnailSrc === oppositeThumbnailSrc) {
            oppositeThumbnail = tempOppositeThumbnail;
        }
    }
    const previousActiveThumbnail = currentParentShowcase.getElementsByClassName("thumbnail-active")[0];
    const previousOppositeActiveThumbnail = oppositeShowcase.getElementsByClassName("thumbnail-active")[0];
    // Remove active state of previous active thumbnail for both static and lightbox
    previousActiveThumbnail.classList.remove("thumbnail-active");
    previousOppositeActiveThumbnail.classList.remove("thumbnail-active");
    // Add active state for current thumbnail and opposite current thumbnail
    const currentThumbnailParent = currentThumbnail.parentElement;
    const oppositeThumbnailParent = oppositeThumbnail.parentElement;
    currentThumbnailParent.classList.add("thumbnail-active");
    oppositeThumbnailParent.classList.add("thumbnail-active");
}
function setHeightToDocumentHeight(targetElement) {
    /*
    Sets the targeted element height into documents offset height(px unit).
        :@param targetSelector: Object - an HTML element object as target.
        :return undefined:
    */
    const documentHeight = document.getElementsByTagName("html")[0].offsetHeight;
    if (targetElement.style.height !== documentHeight) {
        targetElement.style.height = `${documentHeight}px`;
    }
}
function productGalleryHandler () {
    /*
    Handles the event when a thumbnail has been clicked.
    */
    const imgSource = this.getAttribute("src");
    const regExpStartSlice = /-thumbnail/;
    const startToSliceIdx = imgSource.search(regExpStartSlice);
    const newPreviewSource = `${imgSource.slice(0, startToSliceIdx)}${imgSource.slice(startToSliceIdx + 1 + "thumbnail".length)}`;
    const staticShowcase = document.getElementsByClassName("static-showcase")[0];
    const lightBoxShowcase = document.getElementsByClassName("lightbox-showcase")[0];
    const staticPreview = staticShowcase.getElementsByClassName("preview-img")[0];
    setThumbnailMode(this, staticShowcase, lightBoxShowcase);
    // Change static showcase preview and thumbnail state
    staticPreview.setAttribute("src", newPreviewSource);
    // Change lightbox showcase preview and thumbnail state
    const lightBoxPreview = lightBoxShowcase.getElementsByClassName("preview-img")[0];
    lightBoxPreview.setAttribute("src", newPreviewSource);
    // Change lightbox height to document height
    setHeightToDocumentHeight(lightBoxShowcase);
    // Display lightbox
    lightBoxShowcase.classList.remove("d-lg-none");
}
function addCloseLightBoxListener(containerClass, closeButtonClass, clickHandler) {
    /*
    Add event listeners for lightbox close button.
        :@param closeButtonClass: String - the class selector of the close button element.
        :@param clickHandler: Function - the function be used as event handler.
        :return undefined:
    */
    const lightBoxContainer = document.getElementsByClassName(containerClass)[0];
    const closeLightBoxButton = lightBoxContainer.getElementsByClassName(closeButtonClass)[0];
    lightBoxContainer.addEventListener("click", clickHandler);
    closeLightBoxButton.addEventListener("click", clickHandler);
}
function closeLightBoxHandler() {
    /*
    Closes the lightbox.
        :return undefined:
    */
    const lightBox = document.getElementsByClassName("lightbox-showcase")[0];
    lightBox.classList.add("d-lg-none");
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
    productGalleryHandler, closeLightBoxHandler }
