import Link from 'next/link';

const sites = require('../src/sites.json');

export default () => (
  <div>
    <form>
      {Object.keys(sites).map(site => {
        return (
          <section key={site}>
            <label>{site}</label>
            <br />
            url
            <input type="text" value={sites[site].url} size="100" />
            <br />
            selector class
            <input type="text" value={sites[site].class} />
            <br />
          </section>
        );
      })}
    </form>
    <Link href="/">
      <a>home</a>
    </Link>
    <br />
    <Link href="/addsite">
      <a>add a site</a>
    </Link>
  </div>
);
