const puppeteer = require("puppeteer");
const sites = require("./sites");

async function getCoffee(site) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(site.url);
  await page.waitFor(1000);

  let coffee = await page.evaluate(sel => {
    const selected = Array.from(document.querySelectorAll(sel));
    return selected.map(item => item.innerText)
  }, `.${site.class}`);
  //TODO: write to a document/db
  console.log(coffee);
  await browser.close();
}

Object.keys(sites).map(site => {
  getCoffee(sites[site])
});

