export default class CryptoService {
  static getCrypto() {
    return fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&interval=1d,30d,365d&status=active&per-page=10&sort=rank`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }

  static convertCrypto() {
    return fetch(`https://api.nomics.com/v1/exchange-rates?key=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}