
function main() {
  // call share
  var shares = share(5, 3);
  console.log(shares, open(shares));
  shares = share(5, 2);
  console.log(shares, open(shares));
  shares = share(10, 5);
  console.log(shares, open(shares));
  shares = share(100, 12);
  console.log(shares, open(shares));
}

function share(x, n) {
  var shares = [];
  var sum = 0;

  for (var i = 0; i < n-1; i++) {
    var sign = Math.random() < 0.5 ? 1 : -1;
    var r = sign * Math.floor(Math.random() * 100);
    sum += r;
    shares.push(r);
  }

  shares.push(x - sum);
  return shares;
}

function open(shares) {
  // eslint-disable-next-line brace-style
  return shares.reduce(function (sum, share) {return sum + share}, 0);
}

main();