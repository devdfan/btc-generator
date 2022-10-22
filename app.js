const SwaggerExpress = require('swagger-express-mw')
const http = require('http')
const https = require('https')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const Bot = require('./modules/telegram.js')
const actions = require('./actions/index.js')
const config = require('./config/index.json')

require('dotenv').config()

const app = express()

module.exports = app

SwaggerExpress.create({
  appRoot: __dirname,
}, function (err, swaggerExpress) {
  if (err) {
    throw err
  }

  app.set('trust proxy', true)
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  swaggerExpress.register(app)

  let server
  if (process.env.HTTPS === 'true') {
    server = https.createServer(
      {
        key: fs.readFileSync(process.env.SSL_KEY || 'server.key'),
        cert: fs.readFileSync(process.env.SSL_CERT || 'server.cert'),
      },
      app
    )
  } else {
    server = http.createServer(app)
  }

  server.listen(process.env.PORT)
})

// Bot
const getTotal = () => Array.from({ length: config.hubs }).map((_, i) => JSON.parse(fs.readFileSync(`data/stats${i ? `_${i + 1}` : ``}.json`, 'utf8')).count).reduce((a, b) => a + b, 0)

let globalTotal = getTotal(),
  speed = 0;

setTimeout(() => {
  speed = (getTotal() - globalTotal) * 10
}, 6000)

const phrases = JSON.parse(fs.readFileSync('data/phrases.json', 'utf8'))

const options = {
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: [
      ["🧪", "📟", "🎰"]
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
}

Bot.onText(/\/start/, (msg, match) => {
  Bot.sendMessage(msg.chat.id, phrases[Math.floor(Math.random() * phrases.length)], options)
})


function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds 
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates 
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates 
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}


let daily = JSON.parse(fs.readFileSync('data/daily.json', 'utf8')).count;

Bot.onText(/🧪/, async (msg) => {
  const total = getTotal();

  Bot.sendMessage(msg.chat.id, `
${actions.getWallets()}

🎰 ${(total || 0).toLocaleString()}
🌵 ${getNumberOfDays('09/30/2022 00:00', new Date())} days`, options)
})

Bot.onText(/📟/, async (msg) => {
  Bot.sendMessage(msg.chat.id, `
📟  ${config.hubs * config.chunks} threads (${config.hubs} hubs)

🧬 ${await actions.getUsage()} cpu
🔋 ${((speed / 60).toFixed(0)).toLocaleString()} / sec

💫 ${(getTotal() - daily).toLocaleString()} today`, options)
})

Bot.onText(/🎰/, async (msg) => {
  const { wallet, message, privateKey } = await actions.getBTC()

  if (wallet && wallet.balance && config.storeId !== msg.chat.id) {
    Bot.sendMessage(
      config.storeId,
      `
${message}
🔐: \`${privateKey}\`
`, options
    )
  }

  Bot.sendMessage(
    msg.chat.id,
    `
${message}
`,
    {
      ...options,
      reply_markup: {
        ...options.reply_markup,
        keyboard: wallet && wallet.balance ? ['🔑'] : options.reply_markup.keyboard,
      },
    }
  )
})

Bot.onText(/🔑/, (msg) => {
  Bot.sendMessage(msg.chat.id, '📩 Please contact @yourName to get private key')
})

setInterval(async () => {
  const current = new Date();
  const total = getTotal();
  speed = total - globalTotal

  globalTotal = total

  if (current.getHours() === 4 && current.getMinutes() === 20) {
    Bot.sendMessage(
      config.storeId,
      `
🏵 ${phrases[Math.floor(Math.random() * phrases.length)]}

📟  ${config.hubs * config.chunks} threads (${config.hubs} hubs)
🧬 ${await actions.getUsage()} cpu
🔋 ${(total - daily).toLocaleString()} in 24h
`, options
    )

    daily = total

    try {
      const state = JSON.stringify({ count: daily }, null, 2)

      if (state) {
        fs.writeFileSync('data/daily.json', state, (err) => {
          if (err) {
            console.error(err)
          }
        })
      }
    } catch { }
  }
}, [60000])
