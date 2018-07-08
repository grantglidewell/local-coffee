import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const cheerio = require('cheerio')
const sites = require('../sites.json')

const Index = props => {
  return (
    <div>
      <p style={{ fontSize: 20 }}>{JSON.stringify(props.coffees)}</p>
      <Link href="/sites">
        <a>config</a>
      </Link>
    </div>
  )
}

Index.getInitialProps = async function() {
  const data = await Promise.all(
    Object.keys(sites).map(site => getCoffee(site))
  )
    .then(allCoffeeData => allCoffeeData)
    .catch(console.error)

  console.log('coffee data', data)
  return {
    coffees: data
  }
}

async function getCoffee(site) {
  const page = await fetch(`${sites[site].url}`).then(res => res.text())
  const $ = cheerio.load(page, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: true
  })
  let selected = $(`.${sites[site].class}`).text()
  return { [site]: selected.replace(/\s+/g, ' ') }
}

export default Index
