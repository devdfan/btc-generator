# BTC Generator

<img src="https://github.com/devdfan/btc-generator/blob/master/img/key.jpeg" align="right" alt="BTC generator" width="100" height="100">

**BTC Generator** is a script that helps to find a private key to your lost bitcoin address by checking its public key for a match in the goals list.

## Idea
About 20% of all bitcoins are irretrievably lost. The analytical company [Chainalysys](https://www.chainalysis.com) calculated that 3.7 million BTC coins have been lost since 2009. Taking into account the current exchange rate, their cost is $163 billion.

### Chance to generate an equal key
Like 0,000001%

## How It Works

1. Generate random **privateKey** and **publicKey** using [bitcoinjs-lib@^5.0.2](http://npmjs.com/package/bitcoinjs-lib)

2. The algorithm checks publicKey for a match in `data/goals.json` if an address has matched it will be saved in `data/privates.json`

3. If successful it will check the balance using [api.btc.com](https://chain.api.btc.com/v3/address/12ib7dApVFvg82TXKycWBNpN8kFyiAN1dr) and send a notification to our `storeId` telegram chat

## Usage

### Setup

Before you run the script, we will need to specify a couple of settings

1. Clone project and install packages `yarn -f`

2. Copy **.env.example** file and create a **.env** (`TELEGRAM_TOKEN=` Get token using [@BotFather](https://t.me/BotFather))

3. Manage your `config/index.json`

<img src="https://github.com/devdfan/btc-generator/blob/master/img/server.png"  alt="BTC generator" width="400">

The load on the server depends on these settings, you should be careful that the load on the processor does not exceed **40-50%** maximum

```diff
"hubs": 10,
"chunks": 100,
- "storeId": -000000000,
+ "storeId": -787798297,
```

- **hubs** - Number of processes launched with [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/).

The latest PM2 version is installable with the command `yarn global add pm2`.

To install Node.js and NPM you can use [NVM](https://github.com/nvm-sh/nvm).

Run `pm2 plus` to open a web-based dashboard and cross servers with a diagnostic system.
- **chunks** - Number of threads per script execution.
- **storeId** - Your telegram user or chat id [@getmyid_bot](https://t.me/getmyid_bot).

By this id, the bot will send you notifications and statistics.

### Available scripts

- Launches node app with swagger and telegram bot to track generation process

  `pm2 start app.js`

- Start address generation process

  `pm2 start generate.js && pm2 scale generate 10`

value **10** must be equal to **hubs** from `config/index.json`

- Run **app.js** with a node in production mode

  `yarn start-bot`

- Run **app.js** with nodemon to track changes

  `yarn dev-bot`

- Run **generate.js** with a node in production mode

  `yarn start-generate`

- Run **generate.js** with a nodemon to track changes

  `yarn dev-generate`

- Run **jest** tests

  `yarn test`

### Bot options

🧪 Get statistics for all time

<img src="https://github.com/devdfan/btc-generator/blob/master/img/stats.png" alt="BTC generator" width="400">

📟 Daily stats and CPU load

<img src="https://github.com/devdfan/btc-generator/blob/master/img/bot.png" alt="BTC generator" width="400">

🎰 Generate a random address

<img src="https://github.com/devdfan/btc-generator/blob/master/img/random.png" alt="BTC generator" width="400">

## License

The source code for the site is licensed under the **MIT** license, which you can find in the [LICENSE.md](https://github.com/devdfan/btc-generator/blob/master/LICENSE.md) file.
All graphical assets are licensed under the [Creative Commons Attribution 3.0 Unported License](https://creativecommons.org/licenses/by/3.0/).
