module.exports = async ({ publicKey, privateKey, received, sent, balance }) =>
  await require('axios').get(
    `${process.env.API_URL}/message?publicKey=${publicKey}&privateKey=${privateKey}&received=${received}&sent=${sent}&balance=${balance}`
  ).then((response) => response.data.data)
