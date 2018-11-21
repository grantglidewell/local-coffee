import Link from 'next/link';

export default () => (
  <section>
    <form>
      <label>site name</label>
      <input type="text" name="name" />
      <br />
      <label>site url</label>
      <input type="text" name="url" />
      <br />
      <label>site selector</label>
      <input type="text" name="name" />
    </form>
    <Link href="/">
      <a>home</a>
    </Link>
    <br />
    <Link href="/sites">
      <a>sites</a>
    </Link>
  </section>
);
