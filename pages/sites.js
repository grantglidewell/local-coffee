import Link from 'next/link'
const sites = require('../sites.json')
export default () => {
  return (
    <div>
      <p style={{ fontSize: 20 }}>{JSON.stringify(sites)}</p>
      <Link href="/">
        <a>home</a>
      </Link><br />
      <Link href="/addsite">
        <a>add a site</a>
      </Link>
    </div>
  )
}
