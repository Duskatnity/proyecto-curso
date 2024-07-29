class Page extends HTMLElement {
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
        display: flex;
        height: 80vh;
        justify-content: space-between;
      }
      </style>

      <div class="main-page">
        <slot>
      </div>
      `
  }
}

customElements.define('page-component', Page)
