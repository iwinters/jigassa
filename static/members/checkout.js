var stripe = Stripe('pk_test_51J3V8wJqVp0q1s0YRY8yaufZWHY232TTi5nnUNes1qPSsxkh7Ow1FSUIb1RRi1WkvQEzPX2KBCDG9M8OwXNFNm0g00SCQ9GzWv');

var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function() {
  stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as argument here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    
    sessionId: sessionid
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    
  });
});