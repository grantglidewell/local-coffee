const cheerio = require("cheerio");
const fetch = require("node-fetch");
const AWS = require("aws-sdk");

const sites = require("./sites");
const config = require("./config");

const s3 = new AWS.S3(config);

async function getCoffee(site) {
  const page = await fetch(`${sites[site].url}`).then(res => res.text());
  const $ = cheerio.load(page, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: true
  });
  let selected = $(`.${sites[site].class}`).text();
  return { [site]: selected.replace(/\s+/g, " ") };
}

const getAllCoffees = Promise.all(
  Object.keys(sites).map(site => getCoffee(site))
)
  .then(allCoffeeData => {
    s3
      .putObject({
        Bucket: "gg-nodejs-misc",
        Key: "coffeeOfferings/coffee.json",
        Body: JSON.stringify(allCoffeeData),
        ContentType: "application/json",
        ACL: "public-read"
      })
      .promise();
  })
  .then(console.log)
  .catch(console.log);

exports.handler = getAllCoffees;
