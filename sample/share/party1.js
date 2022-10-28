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
  // create shares
  var shares = jiffClient.share(10, 2, [1, 2], [1, 2]);

  console.log(Object.keys(shares));
  console.log(shares[1] ? shares[1].toString() : '');
  console.log(shares[2] ? shares[2].toString() : '' , shares[2] ?shares[2].value.toString() : '');

  shares[2] && shares[2].wThen(function (value) {
    console.log('share resolved with value', value);
  });

  // open
  console.log(jiffClient.open.toString().split('\n')[0]);
  // open
  var promise = jiffClient.open(shares[1], [1, 3]);
  console.log(promise.toString());

  promise.then(function (result) {
    console.log(result);
  });
});