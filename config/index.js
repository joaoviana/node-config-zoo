let path = require('path');

module.exports = {
  PORT:3000,
  DBS: {
    terrestrial: path.join(__dirname, "../dbs/terrestrial.json"),
    aquatic: path.join(__dirname, "../dbs/aquatic.json"),
    arboreal: path.join(__dirname, "../dbs/arboreal.json")
  },
  ANIMALS: {
    dog: "terrestrial",
    dolphin: "aquatic",
    spider: "arboreal",
    cow: "terrestrial",
    manatin: "aquatic"
  }
}
