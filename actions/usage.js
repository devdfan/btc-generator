module.exports = async () => await require('node-os-utils').cpu.usage().then((data) => `${data} %`)