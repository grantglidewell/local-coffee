import Link from 'next/link';
import fetch from 'node-fetch';

const cheerio = require('cheerio');
const sites = require('../src/sites.json');

const getCoffee = async site => {
  const page = await fetch(`${sites[site].url}`).then(res => res.text());
  const $ = cheerio.load(page, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: true,
  });
  const selected = $(`.${sites[site].class}`).text();
  return { [site]: selected.replace(/\s+/g, ' ') };
};

const Index = ({ coffees }) => {
  if (!coffees) {
    // this is shitty, but
    // compensates for the inability
    // to run getInitialProps
    window.location.reload();
  }
  return (
    <div>
      {coffees.map(item => (
        <div key={Object.keys(item)[0]}>
          <h1>{Object.keys(item)[0]}</h1>
          <p>{Object.values(item)[0]}</p>
        </div>
      ))}
      <Link href="/sites">
        <a>config</a>
      </Link>
    </div>
  );
};

Index.getInitialProps = async () => {
  const data = await Promise.all(
    Object.keys(sites).map(site => getCoffee(site)),
  )
    .then(allCoffeeData => allCoffeeData)
    .catch(console.error);

  return {
    coffees: data,
  };
};

export default Index;
