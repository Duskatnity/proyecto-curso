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

        *{
          box-sizing: border-box;
        }

        p{
          margin: 0;
        }

        .order-page {
          height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1rem;
          align-items: center;
          width: 100%;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .product {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          color: white;
          gap: 1rem;
          font-size: 1.25rem;
        }

        .left {
          justify-self: start;
          margin-left: 0.5rem;
        }

        .right {
          justify-self: end;
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
          color: hsla(270, 83%, 36%, 1);
          font-weight: 600;
        }
      </style>
      <div class="order-page">
        <div class="product-list">
          <div class="product">
            <div class="product-name left">
              <p>Cocacola</p>
            </div>
            <div class="product-price right">
              <p>90.00€</p>
            </div>
            <div class="product-type left">
              <p>16u, 330ml</p>
            </div>
            <div class="quantity right">
              <minus-plus-component></minus-plus-component>
            </div>
          </div>
        </div>
        <button class="see-order">Ver Pedido</button>
      </div>
      `
  }
}

customElements.define('order-product-component', OrderProduct)
