import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
import { showFormElement, applyFilter } from '../redux/crud-slice.js'

class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
    this.unsubscribe = null
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/admin/users`
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

      .register-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 0.2rem 1rem;
        font-weight: 600;
      }

      .arrow-button:before {
        content: "<<";
        color: gray;
      }

      .arrow-button:hover {
        cursor: pointer;
      }

      svg {
        width: 2rem;
        height: 2rem;
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
        <div class="register-total">
          <div class="register-count">
            <p>1 registro en total, mostrando 10 por página</p>
          </div>
          <div class="arrow-button">
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

      const listEmail = document.createElement('li')
      listEmail.classList.add('email')
      listEmail.textContent = `Email: ${element.email}`
      list.appendChild(listEmail)

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
    this.shadow.querySelector('.table').addEventListener('click', async (event) => {
      if (event.target.closest('.edit-button')) {
        const id = event.target.closest('.edit-button').dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`)
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
    })
  }
}

customElements.define('table-component', Table)
