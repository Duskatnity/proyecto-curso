import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
import { showFormElement } from '../redux/crud-slice.js'

class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/admin/users`
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(async () => {
      const currentState = store.getState()

      if (currentState.crud.tableEndpoint && isEqual(this.endpoint, currentState.crud.tableEndpoint)) {
        await this.loadData()
        await this.render()
      }
    })

    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`)
    this.data = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      .left-column {
        padding: 20px;
      }

      .filter-bar {
        width: 100%;
        background-color: white;
        padding: 0.2rem;
        margin-bottom: 1rem;
        align-items: center;
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

      <div class="left-column">
        <div class="filter-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>filter-menu</title><path d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" /></svg>          </div>
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
      removeButton.classList.add('remove-button')
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

    this.renderRegisterButtons()
  }

  async renderRegisterButtons () {
    this.shadow.querySelector('.register-list').addEventListener('click', async (event) => {
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

      }
    })
  }
}

customElements.define('table-component', Table)
