import * as Slider from './preview-slider.js'
import * as prodDataFetcher from './fetch-product.js'
// Get test product
const testUrl = "http://127.0.0.1:5500/", testDirectory = "static/js/product.json";
const productData = prodDataFetcher.getProductObj(testUrl, testDirectory)
console.log(productData)