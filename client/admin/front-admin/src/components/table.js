class Table extends HTMLElement {
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
      .left-column {
        padding: 20px;
      }

      .filter-bar {
        width: 100%;
        background-color: white;
        padding: 0.2rem;
        margin-bottom: 1rem;
        align-items: center;
      }

      .register-list {
        display: flex;
        justify-content: center;
        min-height: 75vh;
      }

      .register {
        display: block;
        width: 45vh;
      }

      .register-top {
        display: flex;
        width: 45vh;
        background-color: white;
        justify-content: flex-end;
        padding: 0.2rem;
      }

      .register-bottom {
        display: flex;
        width: 45vh;
        flex-direction: column;
        padding: 0.2rem;
        background-color: black;
        color: white;
      }

      .register-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 1rem;
        font-weight: 600;
      }

      .arrow-button:before {
        content: "<<";
        color: gray;
      }

      .arrow-button:hover {
        cursor: pointer;
      }

      svg {
        width: 2rem;
        height: 2rem;
      }
      </style>

      <div class="left-column">
        <div class="filter-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>filter-menu</title><path d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" /></svg>          </div>
        <div class="register-list">
          <div class="register">
            <div class="register-top">
            <div class="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>              </div>
            <div class="remove-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>              </div>
            </div>
            <div class="register-bottom">
              <p class="name">Nombre: Carlos</p>
              <p class="email">Email: carlossedagambin@gmail.com</p>
              <p class="creation-date">Fecha de creación: 2024-04-22</p>
              <p class="update-date">Fecha de actualización: 2024-04-22</p>
            </div>
          </div>
        </div>
        <div class="register-total">
          <div class="register-count">
            <p>1 registro en total, mostrando 10 por página</p>
          </div>
          <div class="arrow-button">
          </div>
        </div>
      </div>
      `
  }
}

customElements.define('table-component', Table)
