import * as Util from  './util.js';
function deleteCartItemHandler(e)  {
    /*
    Event handler for delete cart item event.
        :@param e: Event Object: Object - triggered click event instance.
        :return undefined:
    */
    const targetText = e.path[2].getElementsByClassName('cart-item-product-name-box')[0].textContent;
    const CART_KEY = 'storageCart';
    const [hasEntries, cartContent] = Util.checkCart(CART_KEY);
    if (hasEntries) {
        let entryRecordsArray = JSON.parse(cartContent);
        for (const entry of entryRecordsArray) {
            const entryObject = JSON.parse(entry);
            const productName = entryObject['prodName'];
            if (productName === targetText) {
                // Update cart content
                const recordIdx = entryRecordsArray.indexOf(entry);
                entryRecordsArray.splice(recordIdx, 1);
            }
        }
        // Update storage
        if (entryRecordsArray.length < 1) {
            entryRecordsArray = undefined;
        }
        const jsonCartContent = JSON.stringify(entryRecordsArray);
        Util.updateCart(CART_KEY, jsonCartContent);
    }
    
}
async function deleteCartItemListener(delIconClass, clickHandler) {
    /*
    Event listener for deleting cart item.
        :@param delIconClass: String - target class of delete icon(s).
        :@param clickHandler: Function - delete handler.
        :return undefined:
    */
    function getDeleteIcons()  {
        return new Promise((resolve) => {
            const delIconArr = document.getElementsByClassName(delIconClass);
            let checkElementsInterval = setInterval(() => {
                if (delIconArr.length > 0) {
                    resolve(delIconArr);
                    clearInterval(checkElementsInterval);
                }
            }, 100);
        });
    }
    const targets = await getDeleteIcons()
    for (const targ of targets) {
        targ.addEventListener('click', clickHandler);
    }
    
}
export { deleteCartItemListener, deleteCartItemHandler};