import Link from 'next/link'
import fetch from 'node-fetch'

const cheerio = require('cheerio')
const sites = require('../sites.json')

const Index = props => {

  if (!props.coffees) {
    // this is shitty, but 
    // compensates for the inability 
    // to run getInitialProps
    window.location.reload()
  }
  return (
    <div>
      {props.coffees.map(item => {
        return <div key={Object.keys(item)[0]}><h1>{Object.keys(item)[0]}</h1><p>{Object.values(item)[0]}</p></div>
      })}
      <Link href="/sites">
        <a>config</a>
      </Link>
    </div>
  )
}

Index.getInitialProps = async function () {
  const data = await Promise.all(
    Object.keys(sites).map(site => getCoffee(site))
  )
    .then(allCoffeeData => allCoffeeData)
    .catch(console.error)

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
