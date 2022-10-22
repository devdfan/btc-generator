const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const Bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

module.exports = Bot