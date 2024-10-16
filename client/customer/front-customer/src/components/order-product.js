class OrderProduct extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
    this.unsubscribe = null
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/customer/products`
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const endpoint = this.queryString ? `${this.endpoint}?${this.queryString}` : this.endpoint
    const response = await fetch(endpoint)
    this.data = await response.json()
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
          margin-bottom: 1rem;
          border-bottom: 1px solid #ffffff;
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
        </div>
        <button class="see-order">Ver Pedido</button>
      </div>
      `

    const productList = this.shadow.querySelector('.product-list')

    this.data.rows.forEach(productItem => {
      console.log(productItem)
      const product = document.createElement('div')
      product.classList.add('product')
      productList.appendChild(product)

      const productName = document.createElement('div')
      productName.classList.add('product-name', 'left')
      product.appendChild(productName)

      const name = document.createElement('p')
      name.textContent = `${productItem.name}`
      productName.appendChild(name)

      const productPrice = document.createElement('div')
      productPrice.classList.add('product-price', 'right')
      product.appendChild(productPrice)

      const price = document.createElement('p')
      price.textContent = `${productItem.price.basePrice}€`
      productPrice.appendChild(price)

      const productType = document.createElement('div')
      productType.classList.add('product-type', 'left')
      product.appendChild(productType)

      const type = document.createElement('p')
      type.textContent = `${productItem.units}u, ${productItem.measurement}${productItem.measurementUnit}`
      productType.appendChild(type)

      const productQuantity = document.createElement('div')
      productQuantity.classList.add('quantity', 'right')
      product.appendChild(productQuantity)

      const quantity = document.createElement('minus-plus-component')
      productQuantity.appendChild(quantity)
    })
  }
}

customElements.define('order-product-component', OrderProduct)
