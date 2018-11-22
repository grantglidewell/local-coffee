import React, {Component, Fragment} from 'react'

export default class CoffeeTabs extends Component {
  state = {
    currentTab: 0,
    coffees: this.props.coffees
  }
  render() {
    const {coffees, currentTab} = this.state
    return <section style={{
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#E9EAE8', 
      color: '#313D3F', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '3rem'
      }}>
    <nav style={{
      display: 'flex'
      }}>
      {coffees.map((coffee, i) => {
        return <header style={{
          fontSize: '1.7rem', 
          flex: '1', 
          padding: '1rem', 
          color: currentTab === i ? '#000' : 'inherit', 
          textShadow: currentTab === i ? '1px 1px 2px #a93232' : 'none', 
          cursor: 'pointer'
          }} onClick={() => this.setState({currentTab: i})}>
            {Object.keys(coffee)[0]}
          </header>
      })}</nav>
      {coffees.map((coffee, i) => {
        if(i === currentTab){
          return <article style={{
            fontSize: '1.2rem', 
            maxWidth: '60vw', 
            alignSelf: 'center', 
            textAlign: 'center', 
            marginTop: '4rem'
            }}>
          {Object.values(coffee)[0]}
        </article>
        }
      })

      }
    </section>
  }
}