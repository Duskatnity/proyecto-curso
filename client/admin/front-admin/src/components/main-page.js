class MainPage extends HTMLElement {
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
      .main-page {
        display: grid;
        height: 80vh;
        gap: 2rem;
        grid-template-columns: 2fr 4fr;
      }
      </style>

      <div class="main-page">
        <slot>
      </div>
      `
  }
}

customElements.define('main-page-component', MainPage)
