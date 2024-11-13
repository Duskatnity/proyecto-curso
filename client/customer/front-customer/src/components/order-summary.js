import { store } from '../redux/store.js'

class OrderSummary extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
    this.formElementData = null
    this.data = []
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      this.data = currentState.cart.cartProducts
      this.render()
    })

    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        p {
          margin: 0.5rem 0.5rem;
        }

        .see-order {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .see-order button{
          border: none;
          width: 15rem;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 3rem;
          color: hsla(270, 83%, 36%, 1);
          font-weight: 600;
        }

        .slider {
          position: fixed;
          top: 0;
          right: -100%;
          background-color: hsla(241, 83%, 36%, 1);
          height: 100vh;
          min-height: 100vh;
          transition: right 0.4s;
          z-index: 5000;
          width: 100%;
        }

        .slider.active {
          right: 0;
        }

        .slider-header{
          align-items: center;
          display: flex;
          justify-content: space-between;
          background-color: black;
          margin-bottom: 2rem;
          align-items: left;
        }

        .slider-header h1{
          color: white;
          font-size: 1rem;
          margin-left: 1rem;
        }

        
        .slider-header svg{
          fill: white;
          width: 2rem;
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
          flex-grow: 1;
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

        .finish-order {
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

      <div class="see-order">
        <button>Ver Pedido</button>
      </div>
      <div class="slider">
        <div class="slider-header">
          <div class="title">
            <h1>Resumen del pedido</h1>
          </div>
          <div class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z" /></svg>
          </div>
        </div>
        <div class="order-page">
          <div class="product-list">
          </div> 
          <div class="order-summary">
            <div class="order-info">
              <div class="total left">
                <h2>Total</h2>
              </div>
              <div class="total-price right">
                <h2 id="total"></h2>
              </div>
              <div class="description left">
                <p>Impuestos no incluidos</p>
              </div>
            </div>
            <button class="finish-order">Finalizar Pedido</button>
          </div>
        </div>
      </div>
      `

    const productList = this.shadow.querySelector('.product-list')
    const seeButton = this.shadow.querySelector('.see-order')
    const backButton = this.shadow.querySelector('.back-button')
    const finishButton = this.shadow.querySelector('.finish-order')
    const slider = this.shadow.querySelector('.slider')

    seeButton.addEventListener('click', () => {
      slider.classList.toggle('active')
    })

    backButton.addEventListener('click', () => {
      slider.classList.toggle('active')
    })

    finishButton.addEventListener('click', async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        })

        if (response.ok) {
          const result = await response.json()
          console.log('Datos enviados exitosamente:', result)
        } else {
          console.error('Error al enviar los datos:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud fetch:', error)
      }
    })

    this.data.forEach(productItem => {
      console.log(productItem)
      const product = document.createElement('div')
      product.classList.add('product')
      productList.appendChild(product)

      const productName = document.createElement('div')
      productName.classList.add('product-name', 'left')
      product.appendChild(productName)

      const name = document.createElement('p')
      name.textContent = productItem.name
      productName.appendChild(name)

      const productPrice = document.createElement('div')
      productPrice.classList.add('product-price', 'right')
      product.appendChild(productPrice)

      const price = document.createElement('p')
      price.textContent = productItem.price.basePrice * productItem.quantity + ('€')
      parseFloat(price.textContent)
      productPrice.appendChild(price)

      const productType = document.createElement('div')
      productType.classList.add('product-type', 'left')
      product.appendChild(productType)

      const type = document.createElement('p')
      type.textContent = (productItem.units + 'u,') + (' ') + (productItem.measurement) + (productItem.measurementUnit)
      productType.appendChild(type)

      const productQuantity = document.createElement('div')
      productQuantity.classList.add('quantity', 'right')
      product.appendChild(productQuantity)

      const quantity = document.createElement('p')
      quantity.textContent = (productItem.quantity) + ('x') + productItem.price.basePrice + ('€')
      productQuantity.appendChild(quantity)
    })

    const total = this.data.reduce(function (acumulador, producto) {
      return acumulador + (producto.price.basePrice * producto.quantity)
    }, 0)

    this.shadow.getElementById('total').textContent = `${total} €`
  }
}

customElements.define('order-summary-component', OrderSummary)
