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
        .product {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
        }
      </style>

      <div class="product">
        <div class="product-name">
          <p>Cocacola</p>
        </div>
        <div class="product-price">
          <p>90.00€</p>
        </div>
        <div class="product-type">
          <p>16u, 330ml</p>
        </div>
        <div class="quantity">
          <p>Aqui los botones</p>
        </div>
      </div>
      `
  }
}

customElements.define('order-product-component', OrderProduct)
