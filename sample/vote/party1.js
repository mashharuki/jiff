var JIFFClient = require('../../lib/jiff-client.js');

/**
 * connect function
 */
function onConnect() {
  console.log('All parties connected!');
}

// options
var options = { party_count: 3, crypto_provider: true, onConnect: onConnect };
// create client
var jiffClient = new JIFFClient('http://localhost:9112', 'our-setup-application', options);

var voteOptions = ['IPA', 'Lager', 'Stout', 'Pilsner'];
var input = [1, 0, 0, 0];

// caliculate
jiffClient.wait_for([1, 2, 3], function () {
  // results
  var results = [];

  for (var i = 0; i < voteOptions.length; i++) {
    var ithOptionShares = jiffClient.share(input[i]); // create shares
    var ithOptionResult = ithOptionShares[1].sadd(ithOptionShares[2]).sadd(ithOptionShares[3]);
    results.push(jiffClient.open(ithOptionResult)); // open
  }

  Promise.all(results).then(function (results) {
    console.log('voteOptions', voteOptions);
    console.log('results', results);
  });
});

console.log(jiffClient.share.toString().split('\n')[0]);