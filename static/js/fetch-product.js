const getProductObj = (baseUrl=null, dataFileDirectory="") => {
    /*
    Fetches a json file and returns an obj.
        :@param baseUrl: String - contains website base URL.
        :@param dataFileDirectory: String - contains file directory.
        :return promise: Object - a promise object that contains the fetched data.
    */
    // 
    if (baseUrl === null || dataFileDirectory === "") {
        // Arguments check
        throw new Error("cannot fetch product data!");
    } else {
        let productDataUrl;
        const urlLastChar = baseUrl[baseUrl.length - 1];
        // Check for url last character
        if (urlLastChar === "/") {
            productDataUrl = `${baseUrl}${dataFileDirectory}`;
        } else {
            productDataUrl = `${baseUrl}/${dataFileDirectory}`;
        }
        const promisedDataGetter = fetch(productDataUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((productObj) => {
            // returns a promise that has a function that contains the object from json.
            return productObj;
        })
        return promisedDataGetter;
    }
}
export { getProductObj }
