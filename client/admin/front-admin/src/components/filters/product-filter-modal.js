import { store } from '../../redux/store.js'
import { applyFilter } from '../../redux/crud-slice.js'

class ProductsModalFilter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('show-modal-filter', this.handleShowFilterModal.bind(this))
    this.render()
  }

  handleShowFilterModal (event) {
    this.shadow.querySelector('.overlay').classList.add('active')
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .overlay{
          align-items: center;
          background-color: hsla(0, 0%, 0%, 0.75);
          display: flex;
          height: 100vh;
          justify-content: center;
          position: fixed;
          left: 0;
          opacity: 0;
          top: 0;
          transition: opacity 0.3s, visibility 0.3s, z-index 0.3s;
          visibility: hidden;
          width: 100%;
          z-index: -1;
        }
        
        .overlay.active{
          opacity: 1;
          visibility: visible;
          z-index: 1000;
        }
        
        .modal{
          background-color: hsl(0, 0%, 100%);
          box-shadow: 10px 4px 14px 0px hsla(0, 0%, 0%, 0.75);
          height: 22vh;
          padding: 1rem;
          width: 30%;
        }
        
        .modal-header h3{
          color: hsl(0, 0%, 0%);
          font-size: 1.2rem;
          font-weight: 600;
          text-align: left;
        }

        .modal-body{
          align-items: center;
          display: flex;
          gap: 1rem;
          height: 100%;
          justify-content: flex-end;
        }
        
        .destroy-button button{
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.15rem 2rem;
        }
        
        .confirmation-button{
          background-color: hsl(120, 55%, 31%);
        }
        
        .cancel-button{
          background-color: hsl(0, 64%, 49%);
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <form>
            <div class="modal-header">
              <h3>Nombre</h3>
            </div>
            <input name="nombre">
          <div class="modal-body">
            <div class="destroy-button confirmation-button">
              <button>Filtrar</button>
            </div>
            <div class="destroy-button cancel-button">
              <button>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      `

    this.shadow.querySelector('.cancel-button').addEventListener('click', () => {
      this.shadow.querySelector('.overlay').classList.remove('active')
    })

    this.shadow.querySelector('.confirmation-button').addEventListener('click', (event) => {
      event.preventDefault()
      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      console.log(formDataJson)

      const queryString = Object.entries(formDataJson).map(([key, value]) => {
        return `${key}=${value}`
      }).join('&')

      store.dispatch(applyFilter(queryString))

      this.shadow.querySelector('.overlay').classList.remove('active')
      form.reset()
    })
  }
}

customElements.define('products-filter-component', ProductsModalFilter)
