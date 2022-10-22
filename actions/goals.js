module.exports = () => {
  const wallets = JSON.parse(require('fs').readFileSync('data/goals.json', 'utf8')).length;

  return `
🚀 ${wallets.toLocaleString()} wallets

Addresses richer than
\`\`\`
| $1,000,000 | $10,000,000 |
|------------|-------------|
| ${(wallets - 4200).toLocaleString()}      | ${(4200).toLocaleString()}       |
\`\`\`
  `
}