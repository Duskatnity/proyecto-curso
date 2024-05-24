class OrderProduct extends HTMLElement {
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
        .filter-page {
          height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .filter-page button {
          height: 1.5rem;
          width: 9rem;
          background: white;
          border: none;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .filter-page input {
          height: 1.5rem;
          width: 10rem;
          margin-bottom: 1rem;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 1; /* Permite que la lista de productos crezca para ocupar el espacio disponible */
        }

        .filterer {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          color: white;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .product {
          border-top: 1px solid #ffffff;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          color: white;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .left {
          justify-self: start;
          margin-left: 0.5rem;
        }

        .right {
          justify-self: end;
          margin-right: 0.5rem;
        }

        .order-date {
          font-size: 1rem;
        }

        .see-order {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: none;
          width: 15rem;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 3rem;
          color: black;
          font-weight: 600;
          margin-bottom: 2rem;
        }
      </style>
        <div class="filter-page">
          <div class="filterer">
            <div class="product-name left">
              <input type=text placeholder="Referencia del pedido">
            </div>
            <div class="product-price right">
              <button class="reference-search">
                Buscar por referencia
              </button>
            </div>
            <div class="product-type left">
              <input type="date">
            </div>
            <div class="quantity right">
              <button class="date-search">
                Buscar por fecha
              </button>
            </div>
          </div>
          <div class="order-list">
            <div class="product">
              <div class="order-number left">
                <p>00000000002</p>
              </div>
              <div class="order-price right">
                <p>180.00€</p>
              </div>
              <div class="order-date left">
                <p>13-05-2024 17:09</p>
              </div>
              <button class="see-order right">
                Ver Pedido
              </button>
            </div>
            <div class="product">
              <div class="order-number left">
                <p>00000000002</p>
              </div>
              <div class="order-price right">
                <p>180.00€</p>
              </div>
              <div class="order-date left">
                <p>13-05-2024 17:09</p>
              </div>
              <button class="see-order right">
                Ver Pedido
              </button>
            </div>
          </div>
        </div>
      `
  }
}

customElements.define('order-filterer-component', OrderProduct)
