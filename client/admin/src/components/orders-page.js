class OrderPage extends HTMLElement {
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
        header {
          display: flex;
          justify-content: space-between;
        }

        h1 {
          color: white;
          margin-left: 1rem;
        }

        p{
          margin: 0.25rem;
        }

        .orders-page {
          display: flex;
          height: 80vh;
        }

        .orders-page svg {
          width: 2rem;
          height: 2rem;
        }

        .orders-page svg:hover {
          cursor: pointer;
          fill: blue;
        }

        .left-column {
          width: 33.33%;
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

        .right-column {
          width: 66.67%;
          padding: 20px;
        }

        .options-bar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background-color: white;
          margin-bottom: 1rem;
          align-items: center;
        }

        .option-general {
          display: flex;
          background-color: purple;
          color: white;
          padding: 0.5rem;
          font-weight: 600;
        }

        .option-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 0.1rem;
          margin-right: 1rem;
        }

        .search-fields {
          display: flex;
          flex-direction: row;
        }

        .name-search, .email-search {
          display: flex;
          flex-direction: column;
          color: white;
          font-size: 1rem;
          margin-right: 1rem;
          font-weight: 600;
        }

        .name-input, .email-input {
          border: none;
          border-bottom: 1px solid white;
          background-color: hsla(239, 63%, 50%, 1);
          height: 3vh;
          color: white;
          margin-bottom: 1rem;
          width: 66vh;
        }

      </style>


      <header>
      <div class="title">
        <h1>Pedidos</h1>
      </div>
      <div class="menu-icon">
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 137.95 137.95" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M36.974,28.826V8.138C36.974,3.666,33.326,0,28.848,0H8.16C3.693,0,0.027,3.666,0.027,8.138v20.688 c0,4.463,3.666,8.138,8.132,8.138h20.688C33.326,36.964,36.974,33.29,36.974,28.826z"></path> <path d="M82.932,28.826V8.138C82.932,3.666,79.284,0,74.809,0H54.126c-4.472,0-8.138,3.666-8.138,8.138v20.688 c0,4.463,3.666,8.138,8.138,8.138h20.682C79.284,36.964,82.932,33.29,82.932,28.826z"></path> <path d="M128.893,28.826V8.138c0-4.473-3.642-8.138-8.123-8.138h-20.685c-4.464,0-8.13,3.666-8.13,8.138v20.688 c0,4.463,3.666,8.138,8.13,8.138h20.685C125.251,36.964,128.893,33.29,128.893,28.826z"></path> <path d="M36.974,74.811V54.124c0-4.473-3.647-8.138-8.126-8.138H8.16c-4.466,0-8.132,3.66-8.132,8.138v20.688 c0,4.457,3.666,8.136,8.132,8.136h20.688C33.326,82.947,36.974,79.268,36.974,74.811z"></path> <path d="M82.932,74.811V54.124c0-4.473-3.647-8.138-8.123-8.138H54.126c-4.472,0-8.138,3.66-8.138,8.138v20.688 c0,4.457,3.666,8.136,8.138,8.136h20.682C79.284,82.947,82.932,79.268,82.932,74.811z"></path> <path d="M128.893,74.811V54.124c0-4.473-3.642-8.138-8.123-8.138h-20.685c-4.464,0-8.13,3.66-8.13,8.138v20.688 c0,4.457,3.666,8.136,8.13,8.136h20.685C125.251,82.947,128.893,79.268,128.893,74.811z"></path> <path d="M36.974,120.791v-20.685c0-4.47-3.647-8.135-8.126-8.135H8.16c-4.466,0-8.132,3.665-8.132,8.135v20.685 c0,4.464,3.666,8.142,8.132,8.142h20.688C33.326,128.932,36.974,125.248,36.974,120.791z"></path> <path d="M82.932,120.791v-20.685c0-4.47-3.647-8.135-8.123-8.135H54.126c-4.472,0-8.138,3.665-8.138,8.135v20.685 c0,4.464,3.666,8.142,8.138,8.142h20.682C79.284,128.932,82.932,125.248,82.932,120.791z"></path> <path d="M137.923,129.809v-20.686c0-4.469-3.647-8.141-8.123-8.141h-20.685c-4.47,0-8.142,3.665-8.142,8.141v20.686 c0,4.463,3.672,8.141,8.142,8.141H129.8C134.275,137.95,137.923,134.272,137.923,129.809z"></path> </g> </g> </g></svg>
      </div>
      </header>

      <div class="orders-page">
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
        <div class="right-column">
          <div class="options-bar">
            <div class="option-general">
              <p>General</p>
            </div>
            <div class="option-buttons">
              <div class="clean-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>              </div>
              <div class="save-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>              </div>
            </div>
          </div>
          <div class="search-fields">
            <div class="name-search">
              <label>Nombre</label>
              <input type="text" class="name-input">
            </div>
            <div class="email-search">
              <label>Email</label>
              <input type="text" class="email-input">
            </div>
          </div>
        </div>
      </div>

      
      `
  }
}

customElements.define('orders-page-component', OrderPage)
