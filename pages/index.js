import Link from 'next/link';
import Head from 'next/head';
import fetch from 'node-fetch';

const cheerio = require('cheerio');
const sites = require('../src/sites.json');

import CoffeeTabs from '../src/CoffeeTabs';

const Index = ({ coffees }) => {
  if (!coffees) {
    coffees = [{ 'Something Went Wrong': [] }];
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <title>Loacl Coffee</title>
      </Head>
      <CoffeeTabs coffees={coffees} />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>
    </>
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

const getCoffee = async site => {
  const page = await fetch(`${sites[site].url}`).then(res => res.text());
  const $ = cheerio.load(page, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: true,
  });
  const selected = $(`.${sites[site].class}`)
    .map(function() {
      return $(this)
        .text()
        .replace(/\s+/g, ' ');
    })
    .toArray();
  return { [site]: selected };
};

export default Index;
