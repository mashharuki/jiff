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
  var shares = jiffClient.share(5, 2, [1, 2], [1, 2]);

  console.log(Object.keys(shares));
  // open
  var promise = jiffClient.open(shares[1], [1, 3]);
  console.log(promise == null);
});