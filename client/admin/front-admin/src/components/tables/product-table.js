import isEqual from 'lodash-es/isEqual'
import { store } from '../../redux/store.js'
import { showFormElement, applyFilter } from '../../redux/crud-slice.js'

class ProductsTable extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
    this.unsubscribe = null
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/admin/products`
    this.page = 1
    this.queryString = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(async () => {
      const currentState = store.getState()

      if (currentState.crud.tableEndpoint && isEqual(this.endpoint, currentState.crud.tableEndpoint)) {
        await this.loadData()
        await this.render()
      }

      if (!isEqual(this.queryString, currentState.crud.queryString)) {
        this.queryString = currentState.crud.queryString
        await this.loadData()
        await this.render()

        if (this.queryString) {
          const filterButton = this.shadow.querySelector('.filter-button')
          const filterCancelButton = this.shadow.querySelector('.filter-cancel-button')

          filterButton.classList.remove('active')
          filterCancelButton.classList.add('active')
        }
      }
    })
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
      .table {
        padding: 20px;
      }

      .filter-bar {
        width: 100%;
        background-color: white;
        padding: 0.2rem;
        margin-bottom: 1rem;
        align-items: center;
      }

      .filter-bar svg:hover {
        cursor: pointer;
      }

      .filter-button, .filter-cancel-button {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }

      .filter-button.active, .filter-cancel-button.active{
        display: block;
      }

      .register-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 70vh;
      }

      .register{
        width: 80%;
        margin-bottom: 1rem;
      }

      .register-top {
        display: flex;
        background-color: white;
        justify-content: flex-end;
        padding: 0.2rem;
      }

      .register-top svg:hover {
        cursor: pointer;
      }

      .register-bottom {
        display: flex;
        flex-direction: column;
        padding: 0.2rem 2rem;
        background-color: black;
        color: white;
      }

      .register-bottom ul{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
      }

      .table-footer{
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .table-info{
        background-color: hsl(0, 0%, 100%);
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        width: 100%;  
      }

      .table-info p{
        color: hsl(0, 0%, 29%);   
        font-weight: 700;
        margin: 0;
      }
      .table-page-buttons{
        align-items: center;
        display: flex;
        gap: 0.5rem;
      }

      .table-page-button{
        cursor: pointer;
        fill: hsl(225, 63%, 65%);
        height: 1.5rem;
        width: 1.5rem;
      }

      .current-page{
        align-items: center;
        display: flex;
        height: 1.5rem;
        width: 4rem;
      }

      .current-page input{
        border: none;
        border-radius: 0.5rem;
        color: hsl(225, 63%, 65%);
        font-weight: 600;
        outline: none;
        text-align: center;
        width: 100%;
      }

      .current-page label{
        border: 1px solid  hsl(225, 63%, 65%);
        border-radius: 0.5rem;
        display: flex;
        gap: 0.2rem;
        padding: 0 0.2rem;
      }

      .current-page button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      .current-page svg{
        fill: hsl(225, 63%, 65%);
        width: 1.5rem;
      }

      svg {
        width: 2rem;
        height: 2rem;
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      </style>

      <div class="table">
        <div class="filter-bar">
          <div class="filter-button active">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>filter-menu</title><path d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" /></svg>          
          </div>
          <div class="filter-cancel-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.76,20.83L17.6,18L14.76,15.17L16.17,13.76L19,16.57L21.83,13.76L23.24,15.17L20.43,18L23.24,20.83L21.83,22.24L19,19.4L16.17,22.24L14.76,20.83M12,12V19.88C12.04,20.18 11.94,20.5 11.71,20.71C11.32,21.1 10.69,21.1 10.3,20.71L8.29,18.7C8.06,18.47 7.96,18.16 8,17.87V12H7.97L2.21,4.62C1.87,4.19 1.95,3.56 2.38,3.22C2.57,3.08 2.78,3 3,3V3H17V3C17.22,3 17.43,3.08 17.62,3.22C18.05,3.56 18.13,4.19 17.79,4.62L12.03,12H12Z" /></svg>
          </div>
        </div>
        <div class="register-list"></div>
        <div class="table-footer">
          <div class="table-info">
            <div>
              <p>
                ${this.data.count} ${this.data.count === 1 ? 'registro' : 'registros'} en total, mostrando ${this.data.meta.size} por página
              </p>  
            </div>                 
            <div class="table-page-buttons">
              <div class="table-page-button" data-page="1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" /></svg>
              </div>  
              <div class="table-page-button" data-page="${this.data.meta.currentPage > 1 ? parseInt(this.data.meta.currentPage) - 1 : 1}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-left</title><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>                     
              </div>  
              <div class="current-page">
                <label>
                  <input type="number" value="${this.data.meta.currentPage}"> 
                  <button class="go-to-page">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" /></svg>
                  </button>
                </label>
              </div>
              <div class="table-page-button" data-page="${parseInt(this.data.meta.currentPage) + 1}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
              </div>  
              <div class="table-page-button" data-page="${this.data.meta.pages}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-double-right</title><path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" /></svg>                      
              </div>  
            </div>                 
          </div>  
        </div>     
      </div>
      `

    const registers = this.shadow.querySelector('.register-list')

    this.data.rows.forEach(element => {
      const register = document.createElement('div')
      register.classList.add('register')
      registers.appendChild(register)

      const registerTop = document.createElement('div')
      registerTop.classList.add('register-top')
      register.appendChild(registerTop)

      const editButton = document.createElement('div')
      editButton.classList.add('edit-button')
      editButton.dataset.id = element.id
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'
      registerTop.appendChild(editButton)

      const removeButton = document.createElement('div')
      removeButton.classList.add('delete-button')
      removeButton.dataset.id = element.id
      removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
      registerTop.appendChild(removeButton)

      const registerBottom = document.createElement('div')
      registerBottom.classList.add('register-bottom')
      register.appendChild(registerBottom)

      const list = document.createElement('ul')
      registerBottom.appendChild(list)

      const listName = document.createElement('li')
      listName.classList.add('name')
      listName.textContent = `Nombre: ${element.name}`
      list.appendChild(listName)

      const listReference = document.createElement('li')
      listReference.classList.add('reference')
      listReference.textContent = `Referencia: ${element.reference}`
      list.appendChild(listReference)

      const listUnits = document.createElement('li')
      listUnits.classList.add('units')
      listUnits.textContent = `Unidades: ${element.units}`
      list.appendChild(listUnits)

      const listCreationDate = document.createElement('li')
      listCreationDate.classList.add('creation-date')
      listCreationDate.textContent = `Fecha de creación: ${element.createdAt}`
      list.appendChild(listCreationDate)

      const listUpdateDate = document.createElement('li')
      listUpdateDate.classList.add('name')
      listUpdateDate.textContent = `Fecha de actualización: ${element.updatedAt}`
      list.appendChild(listUpdateDate)
    })

    this.renderButtons()
  }

  async renderButtons () {
    this.shadow.querySelector('.go-to-page').addEventListener('click', async event => {
      const page = this.shadow.querySelector('.current-page input').value

      if (!page || page < 1 || page.includes('.') || page.includes(',')) {
        this.shadow.querySelector('.current-page input').value = this.page
      } else if (page > this.data.meta.pages) {
        document.dispatchEvent(new CustomEvent('message', {
          detail: {
            message: `No se puede acceder a la página ${page}, solo hay ${this.data.meta.pages} ${this.data.meta.pages === 1 ? 'página disponible' : 'páginas disponibles'} `,
            type: 'error'
          }
        }))
        this.shadow.querySelector('.current-page input').value = this.page
      } else {
        this.page = page
        await this.loadData()
        await this.render()
      }
    })

    this.shadow.querySelector('.table').addEventListener('click', async (event) => {
      if (event.target.closest('.edit-button')) {
        const id = event.target.closest('.edit-button').dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`)
        const data = await response.json()

        const formElement = {
          data
        }

        store.dispatch(showFormElement(formElement))
      }

      if (event.target.closest('.delete-button')) {
        const id = event.target.closest('.delete-button').dataset.id
        const element = `${this.endpoint}/${id}`
        document.dispatchEvent(new CustomEvent('show-modal-destroy', {
          detail: {
            endpoint: this.endpoint,
            element
          }
        }))
      }

      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('show-modal-filter'))
      }

      if (event.target.closest('.filter-cancel-button')) {
        store.dispatch(applyFilter(null))
        this.shadow.querySelector('.filter-button').classList.add('active')
        event.target.closest('.filter-cancel-button').classList.remove('active')
      }

      if (event.target.closest('.table-page-button')) {
        const pageButton = event.target.closest('.table-page-button')
        this.page = pageButton.dataset.page
        await this.loadData()
        await this.render()
      }
    })
  }
}

customElements.define('products-table-component', ProductsTable)
