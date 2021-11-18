import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CryptoService from "./crypto.js";

function displayCrypto(response) {
  let output = buildCryptoString(response);
  $('#show-info').html(output);
}

function buildCryptoString(response) {
  let htmlToDisplay = [];
  for (let i = 0; i < response.length; i++) {
    htmlToDisplay.push(`<p>Coin Name: ${response[i].name}</p>`);
    htmlToDisplay.push(`<img src= '${response[i].logo_url}' class='coin-logo'>`);
    htmlToDisplay.push(`<p>Price: $${response[i].price}</p>`);
    let marketCapPercent = (response[i].market_cap_dominance * 100).toFixed(2);
    htmlToDisplay.push(`<p>Market Cap Dominance: ${marketCapPercent}%</p>`);
    htmlToDisplay.push(`<p>1 Day Price Change: `);
    if (response[i]["1d"].price_change < 0) {
      htmlToDisplay.push(`-`);
    } else {
      htmlToDisplay.push(`+`);
    }
    htmlToDisplay.push(`$${Math.abs(response[i]["1d"].price_change)}</p>`);
    htmlToDisplay.push('<hr>');
    htmlToDisplay.push('<hr>');
  }
  return htmlToDisplay.join('');
}

function displayErrors(error) {
  $('#show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#get-info').click(function() {
    CryptoService.getCrypto()
      .then(function(cryptoResponse) {
        if (cryptoResponse instanceof Error) {
          throw Error(`Nomic API error: ${cryptoResponse.message}`);
        }
        displayCrypto(cryptoResponse);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});