class SummaryHeader extends HTMLElement {
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
        font-size: 1rem;
        margin-left: 1rem;
      }

      svg {
        fill: white;
        width: 2rem;
        height: 2rem;
      }
      </style>

      <header>
        <h1>Resumen de tu pedido</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
      </header>

      `
  }
}

customElements.define('summary-header-component', SummaryHeader)
