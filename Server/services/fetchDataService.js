const constant = require("../constant");

module.exports.fetchData = async (requestParams) => {
  try {
  
    var axios = require("axios");
    var data = JSON.stringify({
      operationName: "SearchRequestQuery",
      variables: {
        filterCounts: true,
        request: {
          paging: {
            page: 1,
            pageSize: 30,
          },
          filterVersion: "1",
          filters: [],
          coreFilters: {
            maxBathrooms: requestParams.maxBathrooms,
            maxBedrooms: requestParams.maxBedrooms,
            maxNightlyPrice: null,
            maxTotalPrice: null,
            minBathrooms: requestParams.minBathrooms,
            minBedrooms: requestParams.minBedrooms,
            minNightlyPrice: 0,
            minTotalPrice: null,
            pets: 0,
          },
          boundingBox: {
            maxLat: requestParams.maxLatitude,
            maxLng: requestParams.maxLongitude,
            minLat: requestParams.minLatitude,
            minLng: requestParams.minLongitude,
          },
          q: requestParams.regionToSearchFor,
        },
        vrbo_web_global_messaging_alert: true,
        vrbo_web_global_messaging_banner: true,
        Vrbo_reco_large_search_destino: false,
      },
      extensions: {
        isPageLoadSearch: false,
      },
      query: constant.SEARCH_QUERY
    });

    var dataConfig = {
      method: constant.POST,
      url: constant.VRBO_URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
    };

    return axios(dataConfig)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return "Could not send response!";
      });
  } catch (e) {
    console.log("Error calling fetchDataService!", e);
  }
};
