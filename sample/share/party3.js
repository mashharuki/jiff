var JIFFClient = require('../../lib/jiff-client.js');

/**
 * connect function
 */
function onConnect() {
  console.log('All parties connected!');
}

// options
var options = { party_count: 2, crypto_provider: true, onConnect: onConnect };
// create client
var jiffClient = new JIFFClient('http://localhost:9112', 'our-setup-application', options);

jiffClient.wait_for([1, 2], function () {
  // receive open
  var promise = jiffClient.receive_open([1, 2], [1, 3]);

  console.log(promise ? promise.toString() : '');

  promise.then(function (result) {
    console.log(result);
  });
});