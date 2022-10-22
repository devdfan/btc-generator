module.exports = async () => {
  const { publicKey, privateKey } = require('./random.js')()
  const wallet = await require('./balance.js')(publicKey)
  const isGoal = (wallet && wallet.balance) || JSON.parse(require('fs').readFileSync('data/goals.json', 'utf8')).includes(publicKey)

  if (isGoal) {
    require('fs').writeFileSync(
      'data/privates.json',
      JSON.stringify([
        ...JSON.parse(require('fs').readFileSync('data/privates.json', 'utf8')),
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
  }

  return {
    wallet, privateKey, publicKey, message: `${wallet
      ? `
💵 ${wallet.balance.toLocaleString()} $

${wallet.balance ? `
📥 ${wallet.received}
🗳️ ${wallet.sent}` : ''}` : `
🚨 Api not available `}
🔑 \`${publicKey}\`
${!isGoal ? `🔐 \`${privateKey}\`` : ''}`
  }
}