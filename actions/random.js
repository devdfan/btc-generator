const bitcoin = require('bitcoinjs-lib')

module.exports = () => {
  const { publicKey: pubkey, privateKey } = bitcoin.ECPair.makeRandom()
  const { address: publicKey } = bitcoin.payments.p2pkh({ pubkey })

  return { privateKey: privateKey.toString('hex'), publicKey }
}