export default class CryptoService {
  static getCrypto() {
    return fetch(`https://api.nomics.com/v1/currencies/ticker?key=e7d306d239a34ca23a33e50fd074358cd28b800f&interval=1d,30d,365d&status=active&per-page=10&sort=rank`)
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
    return fetch(`https://api.nomics.com/v1/exchange-rates?key=e7d306d239a34ca23a33e50fd074358cd28b800f`)
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