// Fetching and displaying available ERC20s
url = "https://ropsten-api.kyber.network/currencies";

// const sellForm = document.getElementById("sell-form");
// const buyForm = document.getElementById("buy-form");

const sellForm = document.getElementById("sellDropdown");
const buyForm = document.getElementById("buyDropdown");

// function fetchCurrencies() {
//   fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//       data.data.forEach((currency) => {
//         // Input Currencies to buy
//                   //<a href="#">EOS</a>
//         let buyItem =  `<a href="#"name="${currency.name}" id="${currency.symbol}" value="${currency.address}">${currency.name} - (${currency.symbol})</a>`
//         // let buyItem = `<input type="radio" name="buyItem" id="buy-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
//         buyForm.insertAdjacentHTML("beforeend", buyItem);

//         // Input Currencies to sell
//         let sellItem =  `<a href="#" name="${currency.name}" id="${currency.symbol}" value="${currency.address}">${currency.name} - (${currency.symbol})</a>`
//         // let sellItem = `<input type="radio" name="sellItem" id="sell-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
//         sellForm.insertAdjacentHTML("beforeend", sellItem);
//       });
//   });
// }

// ################################################################

// To display the Tokens in an alphabetical order, the fetchCurrencies function needs to only fetch the available names of the tokens wheras a seperate function createCurrencyList will create the necessary HTML Tags

const currencyArray = [];
let item;


// Create HTML tags to display currencies to user through the list

function createHtmlTags() {
  currencyArray.forEach((currencyArray) => {
    // Input Currencies to buy
    let currencyTag = `<a href="#"name="${currencyArray[0]}" id="${currencyArray[1]}" value="${currencyArray[2]}">${currencyArray[0]} - (${currencyArray[1]})</a>`
    buyForm.insertAdjacentHTML("beforeend", currencyTag);
    sellForm.insertAdjacentHTML("beforeend", currencyTag);
  })
}

// Fetch currencies from KyberAPI and store sorted in currencyArray Array. Then call createHtmlTags function
function fetchCurrencies() {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.data.forEach((currency) => {
        item = [currency.name, currency.symbol, currency.address, currency.decimals]
        currencyArray.push(item);
        console.log("1");
      });
    }).then((result) => {
      currencyArray.sort();
      createHtmlTags();
  });
}

fetchCurrencies();

// Assign currently selected src and dest token symbols

let srcSymbol = "ETH";
let destSymbol = "KNC";


// Fetch the selected Tokens addresses

let addressToSell = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
let addressToBuy = "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6";

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function SellFunction() {
  document.getElementById("sellDropdown").classList.toggle("show");
}

function BuyFunction() {
  document.getElementById("buyDropdown").classList.toggle("show");
}


// Close the dropdown menu if User selects a token from dropdown
window.onclick = function(event) {
  console.log(event);
  console.log(event.target.parentElement.className);
  // Check condition if User pressed anything else than the image or the title of the token
  if (event.target.parentElement.id != "sell-content" && event.target.parentElement.id != "buy-content"){
    console.log(event);
    console.log("Im insinde if statement")
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');

        // If the sell Dropdown is selected
        if (openDropdown.id == "sellDropdown") {
          console.log(event.target.attributes[3].value);
          addressToSell = `${event.target.attributes[3].value}`;

          // Refresh amounts
          // srcAmountHTML.value = 0;
          // destAmountHTML.value = 0;

          // Re-run getExpectedRate function for new address pair
          getExpectedRate()

          // Refresh Expected rate
          // displayExchangeRate();

          // Set src Token Symbol
          srcSymbol = event.target.attributes.id.value;

          // Set Dropdown value to Token name & symbol
          document.getElementById("sell-button").innerText = `${event.target.attributes.name.value} - (${event.target.attributes.id.value})`;

          // Set sell-symbol Symbol to srcSybol
          document.getElementById('sell-symbol').innerText = srcSymbol


          return addressToSell;
          // If the buy Dropdown is selected
        } else if (openDropdown.id == "buyDropdown") {
          console.log(event.target.attributes[3].value);
          addressToBuy = `${event.target.attributes[3].value}`;

          // Refresh amounts
          // srcAmountHTML.value = 0;
          // destAmountHTML.value = 0;


          // Re-run getExpectedRate function for new address pair
          getExpectedRate()

          // Set src Token Symbol
          destSymbol = event.target.attributes.id.value;

          // Refresh Expected rate
          // displayExchangeRate();

          // Set Dropdown value to Token acronym
          document.getElementById("buy-button").innerText = `${event.target.attributes.name.value} - (${event.target.attributes.id.value})`;

          // Set buy-symbol to srcSybol
          document.getElementById('buy-symbol').innerText = destSymbol


          return addressToBuy;
        } else {
          console.log("not working")
        }
      }
    }
  }
}

