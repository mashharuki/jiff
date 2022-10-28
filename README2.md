# MPC 用の OSS

## チュートリアル用の画面起動コマンド

`npm run tutorial`

## 秘密分散とは何か？

秘密分散（secret sharing）とは暗号技術の一つであり、秘密情報を何らかのグループのメンバーに分散する手法の総称である。各メンバーには、秘密情報から生成されたシェアと呼ばれる情報がそれぞれ渡される。シェアはメンバー数だけ生成され、個々のシェアを見ても元の秘密情報について何もわからないように、なおかつ、十分な数のシェアを集めれば秘密情報を復元することができるように生成される。 このため、秘密情報を情報漏洩と紛失のリスクから守ることができる。

秘密分散の典型的な設定はしきい値構造と言われるものである。t をしきい値としたとき（t≦n）、n 人の参加者のうち t 人以上が集まったら秘密を復元できるが、t 人未満が集まっても秘密は全く分からないようにシェアが生成される。このようなシェアの作成方法は、(t,n)-しきい値秘密分散法，あるいは (t,n)-しきい値法と呼ばれる。

## シャミアのしきい値法

多項式補完を用いた秘密分散法である。(t-1)次曲線に乗っている t 個の点がわかれば、曲線を表す多項式が一意に定まるという性質を利用している。例えば、任意の 2 点を通る直線はちょうど一つしかない。同様に、任意の 3 点を通る放物線（二次曲線）はちょうど一つしかないし、任意の 4 点によって 3 次曲線がちょうど一つ決まる。一般の場合には、t 個の点によって（高々）t − 1 次の多項式が一つ決まる[注釈 4]。

シャミアの (t, n)-しきい値法では、ディーラーはまず、定数項が秘密の値 s、残りの係数がランダムである t − 1 次多項式 f(x) を決める。そして、多項式上の n 点 (x1, f(x1)), ..., (xn, f(xn)) を求め、参加者一人一人に一つの点 (xi, f(xi)) をシェアとして渡す。n 人の参加者のうち t 人以上が点（シェア）を持ち寄れば、元の (t − 1) 次多項式 f(x) が定まる。秘密情報はその多項式の定数項 f(0) として求められる。 x 座標の値 x1, ... ,xn は、互いに異なる 0 以外の値である。これらは秘密に隠しておく必要はなく、各参加者に番号が振られているならば、i 番目の参加者には f(i) を渡すのでも構わない。

### サーバー起動

```js
var JIFFServer = require("../../../../../lib/jiff-server.js");
var jiffServer = new JIFFServer(global.server, { logs: true });
Console.log("Started jiff server on port 9111");
```

### シェアから与えられた値を求める(3 つの場合)

```js
var jiff_instance = new JIFFClient('http://localhost:9111', 'first-mpc-computation', {party_count: 3, crypto_provider: true};

jiff_instance.wait_for([1, 2, 3], function () {
  var shares = jiff_instance.share(10);
  var resultShare = shares[1].sadd(shares[2]).sadd(shares[3]);

  jiff_instance.open(resultShare).then(Console.log);
});
```

```js
var jiff_instance = new JIFFClient('http://localhost:9111', 'first-mpc-computation', {party_count: 3, crypto_provider: true};

jiff_instance.wait_for([1, 2, 3], function () {
  var shares = jiff_instance.share(30);
  var resultShare = shares[1].sadd(shares[2]).sadd(shares[3]);

  jiff_instance.open(resultShare).then(Console.log);
});
```

```js
var jiff_instance = new JIFFClient(
  "http://localhost:9111",
  "first-mpc-computation",
  { party_count: 3, crypto_provider: true }
);

jiff_instance.wait_for([1, 2, 3], function () {
  var shares = jiff_instance.share(50);
  var resultShare = shares[1].sadd(shares[2]).sadd(shares[3]);

  jiff_instance.open(resultShare).then(Console.log);
});
```

### 参考文献

1. [sss(Shamir's Secret Sharing)を Golang で実装する](https://tech.ginco.io/post/shamir-ss/)
