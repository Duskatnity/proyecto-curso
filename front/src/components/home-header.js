class HomeHeader extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      header{
        align-items: center;
        display: flex;
        justify-content: space-between;
        background-color: black;
        margin-bottom: 2rem;
        align-items: left;
      }

      header h1 {
        color: white;
        font-size: 1.5rem;
        margin-left: 1rem;
      }
      </style>

      <header>
        <h1>Inicio</h1>
      </header>

      `
  }
}

customElements.define('home-header-component', HomeHeader)
