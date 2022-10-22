const wallets = require('fs').readFileSync('data/privates.json', 'utf8')

module.exports = () => `🐳 ${JSON.parse(wallets).length || 0} founded wallets`