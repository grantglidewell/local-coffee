const puppeteer = require("puppeteer");
const sites = require("./sites");
const config = require("./config")

const AWS = require("aws-sdk");

const s3 = new AWS.S3(config);

async function getCoffee(site) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(sites[site].url);
  await page.waitFor(1000);

  let coffee = await page.evaluate(sel => {
    const selected = Array.from(document.querySelectorAll(sel));
    return selected.map(item => item.innerText);
  }, `.${sites[site].class}`);
  await browser.close();
  return { [site]: coffee };
}

const getAllCoffees = Promise.all(
  Object.keys(sites).map(site => getCoffee(site))
)
  .then(allCoffeeData =>
    s3
      .putObject({
        Bucket: "gg-nodejs-misc",
        Key: "coffeeOfferings/coffee.json",
        Body: JSON.stringify(allCoffeeData),
        ContentType: "application/json",
        ACL: "public-read"
      })
      .promise()
  )
  .then(console.log)
  .catch(console.log);

exports.handler = getAllCoffees;
