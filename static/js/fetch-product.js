const getProductObj = (baseUrl=null, dataFileDirectory="") => {
    /*
    Fetches a json file and returns an obj.
        :param baseUrl: String - contains website base URL.
        :param dataFileDirectory: String - contains file directory.
        :return Object:
    */
    // 
    if (baseUrl === null || dataFileDirectory === "") {
        // Arguments check
        throw new Error("cannot fetch product data!");
        return;
    } else {
        let productDataUrl;
        const urlLastChar = baseUrl[baseUrl.length - 1];
        // Check for url last character
        if (urlLastChar === "/") {
            productDataUrl = `${baseUrl}${dataFileDirectory}`;
        } else {
            productDataUrl = `${baseUrl}/${dataFileDirectory}`;
        }
        let dataObj = {}
        fetch(productDataUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((resultObj) => {
            dataObj["product"] = resultObj["product"];
        })
        return dataObj;
    }
}
export { getProductObj }