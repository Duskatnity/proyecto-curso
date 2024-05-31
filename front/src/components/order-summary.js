class OrderSummary extends HTMLElement {
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
        p {
          margin: 0.5rem 0rem;
        }

        .order-page {
          height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 1; /* Permite que la lista de productos crezca para ocupar el espacio disponible */
        }

        .product {
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

        .see-order {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          border: none;
          width: 15rem;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 3rem;
          color: hsla(270, 83%, 36%, 1);
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .order-summary {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .order-info {
          margin-top: auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          color: white;
          font-size: 1.25rem;
        }

      </style>
      <div class="order-page">
        <div class="product-list">
        <div class="product">
          <div class="product-name left">
            <p>Cocacola</p>
          </div>
          <div class="product-price right">
            <p>180.00€</p>
          </div>
          <div class="product-type left">
            <p>16u, 330ml</p>
          </div>
          <div class="quantity right">
            <p>2x90.00€</p>
          </div>
        </div>
        </div> 
        <div class="order-summary">
          <div class="order-info">
            <div class="total left">
              <h2>Total</h2>
            </div>
            <div class="total-price right">
              <h2>180.00€</h2>
            </div>
            <div class="description left">
              <p>Impuestos no incluidos</p>
            </div>
          </div>
          <button class="see-order">Finalizar Pedido</button>
        </div>
      </div>
      `
  }
}

customElements.define('order-summary-component', OrderSummary)
