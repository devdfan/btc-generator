const fs = require('fs');
const config = require('./config/index.json');
const methods = require('./actions/index.js')
const bitcoin = require('bitcoinjs-lib')

const goals = JSON.parse(fs.readFileSync(`data/goals.json`, 'utf8'));

const getRandom = () => Array.from({ length: config.chunks }).map(() => {
  const { publicKey: pubkey, privateKey: pKey } = bitcoin.ECPair.makeRandom()
  const { address } = bitcoin.payments.p2pkh({ pubkey })

  return { publicKey: address, privateKey: pKey.toString('hex') }
})

const generate = async () => {
  const keys = getRandom();

  for (let i = 0; i < keys.length; ++i) {
    for (let x = 0; x < goals.length; ++x) {
      if (goals[x] === keys[i].publicKey) {
        save(keys[i].publicKey, keys[i].privateKey)
      }
    }
  }

  log()

  setTimeout(generate, process.env.pm_id && (process.env.pm_id - 1) * (config.chunks / 10))
}

const save = (publicKey, privateKey) => {
  fs.writeFileSync(
    'data/privates.json',
    JSON.stringify([
      ...JSON.parse(fs.readFileSync('data/privates.json', 'utf8')),
      {
        publicKey,
        privateKey,
      },
    ]),
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  )

  methods.getBalance(publicKey).then((wallet) => {
    methods.success({ publicKey, privateKey, received: wallet.received, sent: wallet.sent, balance: wallet.balance, })
  })
}

const log = () => {
  let data
  const file = `data/stats${process.env.pm_id && process.env.pm_id - 1 ? `_${process.env.pm_id}` : ``}.json`

  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    data = { count: 0 }
  }


  data.count += config.chunks

  try {
    const state = JSON.stringify(data, null, 2)

    if (state) {
      fs.writeFileSync(file, state, (err) => {
        if (err) {
          console.error(err)
        }
      })
    }
  } catch { }
}

generate()
