const request = require("request");

const deocode = (address, fn) => {
  const mapUrl =
    "https://api.mapbox.com/search/geocode/v6/forward?&access_token=pk.eyJ1Ijoic2NzNTU2NDc4NzUiLCJhIjoiY2t0cGo0OW9zMG4yNTJwcnoyNm15cWtoNiJ9.WQS21F_tTxHZDfq0Is73yQ";

  request(
    { url: `${mapUrl}&q=${encodeURIComponent(address)}`, json: true },
    (error, response) => {
      if (error) {
        fn("Unable to connect to map.");
      } else {
        const targetMap = response.body.features[0];
        if (!targetMap) {
          fn("Unable to find location coordinate.");
        } else {
          const {
            coordinates: { latitude, longitude },
            full_address,
          } = response.body.features[0].properties;

          fn(undefined, {
            latitude,
            longitude,
            full_address,
          });
        }
      }
    }
  );
};

module.exports = deocode;
