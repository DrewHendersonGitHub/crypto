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
  const intervalDisplays = ["1d", "30d", "365d"];
  for (let i = 0; i < response.length; i++) {
    htmlToDisplay.push(`<p>Coin Name: ${response[i].name}</p>`);
    htmlToDisplay.push(`<img src= '${response[i].logo_url}' class='coin-logo'>`);
    htmlToDisplay.push(`<p>Price: $${response[i].price}</p>`);
    let marketCapPercent = (response[i].market_cap_dominance * 100).toFixed(2);
    htmlToDisplay.push(`<p>Market Cap Dominance: ${marketCapPercent}%</p>`);
    for (let j=0; j < intervalDisplays.length; j++) {
      htmlToDisplay.push(`<p>Price change over ${intervalDisplays[j]}: `);
      if (response[i][intervalDisplays[j]].price_change < 0) {
        htmlToDisplay.push(`-`);
      } else {
        htmlToDisplay.push(`+`);
      }
      htmlToDisplay.push(`$${Math.abs(response[i][intervalDisplays[j]].price_change)}</p>`);
    }
    htmlToDisplay.push(`<hr>`);
  }
  return htmlToDisplay.join('');
}

function displayConvert(response, coin, amount) {
  let output = buildConvertString(response, coin, amount);
  $('#show-info').html(output);
}

function buildConvertString(response, coin, amount) {
  for (let i = 0; i < response.length; i++) {
    if (coin === response[i].currency) {
      return `<p>${amount} ${coin} is equal to $${amount * response[i].rate} USD.</p>`;      
    }
  }
  return `<p>We couldn't find a conversion rate for ${coin}!`;
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
  $('#convert').click(function() {
    CryptoService.convertCrypto()
      .then(function(cryptoResponse) {
        if (cryptoResponse instanceof Error) {
          throw Error(`Nomic API error: ${cryptoResponse.message}`);
        }
        displayConvert(cryptoResponse, $('#coin').val(), $('#amount').val());
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});