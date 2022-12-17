const fetchDataService = require("../services/fetchDataService");

module.exports.fetchData = async (req, res, next) => {
  try {
    let requestParams = {
      regionToSearchFor: req.body.region,
      maxLatitude: req.body.maxLat,
      minLatitude: req.body.minLat,
      maxLongitude: req.body.maxLong,
      minLongitude: req.body.minLong,
      maxBedrooms: req.body.maxBedrooms,
      minBedrooms: req.body.minBedrooms,
      maxBathrooms: req.body.maxBathrooms,
      minBathrooms: req.body.minBathrooms,
    };

    let result = await fetchDataService.fetchData(requestParams);
    res.send(result.data.data.results.listings);
  } catch (e) {
    console.log("Error while calling fetch data operations!", e);
  }
};
