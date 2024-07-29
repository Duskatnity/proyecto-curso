class Title extends HTMLElement {
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
        h1 {
          color: white;
          margin-left: 1rem;
        }
      </style>

      <div class="title">
        <h1>Pedidos</h1>
      </div>
      `
  }
}

customElements.define('title-component', Title)
