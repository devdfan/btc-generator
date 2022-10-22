const fs = require('fs');
const bitcoin = require('bitcoinjs-lib');
const config = require('../config/index.json');

const goals = JSON.parse(fs.readFileSync(`data/goals.json`, 'utf8'));

const getRandom = () => Array.from({ length: config.chunks }).map(() => {
  const { publicKey: pubkey, privateKey: pKey } = bitcoin.ECPair.makeRandom()
  const { address: publicKey } = bitcoin.payments.p2pkh({ pubkey })
  const privateKey = pKey.toString('hex')

  return { publicKey, privateKey }
})

test('Generate BTC', () => {
  getRandom().forEach(({ publicKey, privateKey }) => {
    expect(publicKey.length >= 33).toBe(true)
    expect(privateKey.length).toBe(64)
  })
});

test('Single goal check', () => {
  Array.from({ length: 100 }).forEach(() => {
    expect(goals.indexOf('1pM1qJdTDAjQmZAJLgeDNvDpRBkCvMymu') > -1).toBe(false)
  })
});

const data = getRandom()

test('Check if is not goal', () => {
  data.forEach(({ publicKey }) => {
    expect(goals.indexOf(publicKey) > -1).toBe(false)
  })
});

test('Normal', () => {
  const { publicKey: pubkey } = bitcoin.ECPair.makeRandom()
  const { address: publicKey } = bitcoin.payments.p2pkh({ pubkey })

  expect(goals.indexOf(publicKey) > -1).toBe(false)
});

