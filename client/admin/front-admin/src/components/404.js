class Error extends HTMLElement {
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
          font-size: 5rem;
        }

        p {
          color: white;
          font-size: 2rem;
        }

        .error {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 80rem;
          margin: 3rem;
        }
      </style>

      <div class="error">
        <h1>ERROR 404: PÁGINA NO ENCONTRADA</h1>
        <p>No se que andabas buscando, pero te aseguro que por aquí no lo vas a encontrar. Pero eh, aquí estoy yo pa lo que necesites👍</p>
      </div>
      `
  }
}

customElements.define('error-component', Error)
