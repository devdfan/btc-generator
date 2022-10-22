module.exports = async () => 
  await require('axios').get(`https://bitinfocharts.com/cryptocurrency-prices/`).then((response) => {
    const btc = response.data.match(
      RegExp('href="../bitcoin-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const eth = response.data.match(
      RegExp('href="../ethereum-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const sol = response.data.match(
      RegExp('href="../solana-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const xrp = response.data.match(
      RegExp('href="../xrp-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const ltc = response.data.match(
      RegExp('href="../litecoin-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const etc = response.data.match(
      RegExp('href="../ethereum classic-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const eos = response.data.match(
      RegExp('href="../eos-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const luna = response.data.match(
      RegExp('href="../terra-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const shib = response.data.match(
      RegExp('href="../shiba inu-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]
    const doge = response.data.match(
      RegExp('href="../dogecoin-exchange-charts.html" class="conv_cur" style="font-size:large">(.*?)</a>')
    )[1]

    return `
BTC: ${btc}
ETH: ${eth}
SOL: ${sol}
XRP: ${xrp}
LTC: ${ltc}
ETC: ${etc}
EOS: ${eos}
LUNA: ${luna}
SHIB: ${shib}
DOGE: ${doge}
    `
  })