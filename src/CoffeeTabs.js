import React, { Component, Fragment } from 'react';

export default class CoffeeTabs extends Component {
  state = {
    openTabs: new Set([]),
    coffees: this.props.coffees,
  };
  render() {
    const { coffees, openTabs } = this.state;
    return (
      <section
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#E9EAE8',
          color: '#313D3F',
          display: 'flex',
          padding: '3rem',
        }}
      >
        <nav
          style={{
            width: '70vw',
          }}
        >
          {coffees.map((coffee, i) => {
            return (
              <div>
                <header
                  style={{
                    flex: '1',
                    padding: '1rem',
                    color: openTabs.has(i) ? '#000' : 'inherit',
                    fontSize: openTabs.has(i) ? '1.6rem' : '1.3rem',
                    textDecoration: openTabs.has(i) ? 'underline' : 'none',
                    transition: 'all .3s ease ',
                    alignSelf: 'center',
                    wordWrap: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    let newTabs = openTabs;
                    newTabs.has(i) ? newTabs.delete(i) : newTabs.add(i);
                    this.setState({ openTabs: newTabs });
                  }}
                >
                  {Object.keys(coffee)[0]}
                </header>
                <article
                  style={{
                    visibility: openTabs.has(i) ? 'visible' : 'hidden',
                    opacity: openTabs.has(i) ? 1 : 0,
                    height: openTabs.has(i) ? '100%' : '0',
                    fontSize: '1.2rem',
                    transition: 'opacity .3s linear ',
                    transition: 'height .2s linear ',
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginLeft: '4rem',
                  }}
                >
                  {Object.values(coffee)[0]}
                </article>
              </div>
            );
          })}
        </nav>
      </section>
    );
  }
}
