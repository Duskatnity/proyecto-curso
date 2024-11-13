import { store } from '../redux/store.js'
import { updateProduct, removeProduct } from '../redux/cart-slice.js'

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

        .see-order:hover {
          cursor: pointer;
        }

        .plus-minus-button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--space-12);
          height: var(--space-12);
          border: 1px solid var(--color-blue-500);
          border-radius: var(--round);
          background-color: var(--color-white);
        }
        button:hover {
          background-color: var(--color-blue-200);
          cursor: pointer;
        }
        button:focus {
          outline: none;
          box-shadow: var(--shadow-focus);
        }
        button:active {
          background-color: var(--color-blue-300);
        }

        .quantity-selector {
          width: 20px;
          border: none;
          background-color: #f0f0f0;
          min: 0;
        }

        .quantity-selector.input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
          cursor: none;
        }
      </style>
      <div class="order-page">
        <div class="product-list"></div>
      </div>
      `

    const productList = this.shadow.querySelector('.product-list')

    this.data.rows.forEach(productItem => {
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
      productQuantity.classList.add('plus-minus-button', 'right')
      product.appendChild(productQuantity)

      const minusButton = document.createElement('button')
      minusButton.classList.add('minus')
      minusButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="white"><title>minus-box</title><path d="M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg>'
      productQuantity.appendChild(minusButton)

      const inputQuantity = document.createElement('input')
      inputQuantity.classList.add('quantity-selector')
      inputQuantity.type = 'number'
      inputQuantity.onkeydown = function () { return false }
      inputQuantity.value = '0'
      inputQuantity.min = '0'
      productQuantity.appendChild(inputQuantity)

      const plusButton = document.createElement('button')
      plusButton.classList.add('plus')
      plusButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="white"><title>plus-box</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg>'
      productQuantity.appendChild(plusButton)

      plusButton.addEventListener('click', event => {
        inputQuantity.value = (parseInt(inputQuantity.value) + 1)

        const product = {
          ...productItem,
          quantity: (parseInt(inputQuantity.value))
        }

        store.dispatch(updateProduct(product))
      })

      minusButton.addEventListener('click', event => {
        if (inputQuantity.value > 1) {
          inputQuantity.value = (parseInt(inputQuantity.value) - 1)

          const product = {
            ...productItem,
            quantity: (parseInt(inputQuantity.value))
          }

          store.dispatch(updateProduct(product))
        } else if (inputQuantity.value == 1) {
          inputQuantity.value = (parseInt(inputQuantity.value) - 1)

          const product = {
            ...productItem,
            quantity: (parseInt(inputQuantity.value))
          }

          store.dispatch(removeProduct(product))
        }
      })
    })
  }
}

customElements.define('order-product-component', OrderProduct)
