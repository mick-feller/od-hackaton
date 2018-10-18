export default class SkuApi {
  constructor() {
    this.items = ['341661,515408,291749,2422871,372704,621038,162359,144333'];
  }

  /**
   * LifeCycle Methods for your API
   */
  // This function will be called right before your data gets
  // stored in the redux store. You can potentially sanitize,
  // clean, manipulate the data here before it gets saved.
  /**
    fetchSuccess(response) {
      return response;
    }
  */

  // This function will be called right after your data gets
  // stored but before the loading state is set to true
  /**
    fetchStored(response) {
      return response;
    }
  */

  // This function will be called right after the loadingstate
  // gets set to false, so when the whole api is fully done
  // processing.
  /**
    fetchComplete(response) {
      return response;
    }
  */

  // The payload function has to always be present in the API class
  // This is the actual function returning the settings for the API.
  payload() {
    return {
      // Define the url that needs to be fetched, this is a
      // MANDATORY field
      url: `https://www.officedepot.com/mobile/getAjaxPriceListFromService.do?items=${this.items}&mapBySkuId=true&pr=`, // url of the api
      // store name, this will be the key for your data in your
      // component this is a MANDATORY field. If you fill in an
      // already existing store your data will overwritten unless
      // the merge key is set to true, then your stores will be.
      // merged. If both fetch calls contain the same object keys
      // on the same levels the last one to finish will win.
      store: 'skuData',
      // Do you want to merge the store, or overwrite the store?
      // by default it will overwrite if merge is set to true it
      // will merge your store together.
      merge: true,
      // fetch params, everything is supported that fetch supports
      // this can be omitted if you just want to do a simple GET call
      params: { method: 'GET' },
      // Type of response either json (default) or text, if you are
      // expecting json back you can ommit this
      resType: 'json'
    };
  }
}
