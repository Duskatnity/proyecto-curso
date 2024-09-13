import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
import { refreshTable } from '../redux/crud-slice.js'

class Form extends HTMLElement {
  constructor () {
    super()
    this.unsubscribe = null
    this.formElementData = null
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/admin/users`
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.formElement && !isEqual(this.formElementData, currentState.crud.formElement.data)) {
        this.formElementData = currentState.crud.formElement.data
        this.showElement(this.formElementData)
      }
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>

        svg:hover{
          cursor: pointer;
        }

        p{
          margin: 0.25rem;
        }

        .right-column svg {
          width: 2rem;
          height: 2rem;
        }

        .orders-page svg:hover {
          cursor: pointer;
          fill: blue;
        }

        .register-top {
          display: flex;
          width: 45vh;
          background-color: white;
          justify-content: flex-end;
          padding: 0.2rem;
        }

        .register-bottom {
          display: flex;
          width: 45vh;
          flex-direction: column;
          padding: 0.2rem;
          background-color: black;
          color: white;
        }

        .register-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 1rem;
          font-weight: 600;
        }

        .arrow-button:before {
          content: "<<";
          color: gray;
        }

        .arrow-button:hover {
          cursor: pointer;
        }

        .right-column {
          padding: 20px;
        }

        .options-bar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background-color: white;
          margin-bottom: 1rem;
          align-items: center;
        }

        .option-general {
          display: flex;
          background-color: purple;
          color: white;
          padding: 0.5rem;
          font-weight: 600;
        }

        .option-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 0.1rem;
          margin-right: 1rem;
        }

        .fields form {
          display: flex;
          flex-direction: row;
        }

        .form-element {
          display: flex;
          flex-direction: column;
          color: white;
          font-size: 1rem;
          margin-right: 1rem;
          font-weight: 600;
        }

        input {
          border: none;
          border-bottom: 1px solid white;
          background-color: hsla(239, 63%, 50%, 1);
          height: 3vh;
          color: white;
          margin-bottom: 1rem;
          width: 66vh;
        }
      </style>

      <div class="right-column">
        <div class="options-bar">
          <div class="option-general">
            <p>General</p>
          </div>
          <div class="option-buttons">
            <div class="clean-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>              </div>
            <div class="save-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>              </div>
          </div>
        </div>
        <div class="fields">
          <form>
            <input type="hidden" name="id">
            <div class="form-element">
              <label>Nombre</label>
              <input type="text" class="name-input" name="name">
            </div>
            <div class="form-element">
              <label>Email</label>
              <input type="text" class="email-input" name="email">
            </div>
          </form>
        </div>
      </div>
      `
    this.renderSaveButton()
    this.renderResetButton()
  }

  renderResetButton () {
    this.shadow.querySelector('.clean-button').addEventListener('click', async (event) => {
      const form = this.shadow.querySelector('form')
      form.reset()
      this.shadow.querySelector("[name='id']").value = ''
    })
  }

  renderSaveButton () {
    this.shadow.querySelector('.save-button').addEventListener('click', async () => {
      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)

      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }

      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const method = formDataJson.id ? 'PUT' : 'POST'
      const endpoint = formDataJson.id ? `${this.endpoint}/${formDataJson.id}` : this.endpoint

      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        store.dispatch(refreshTable(endpoint))
        form.reset()

        document.dispatchEvent(new CustomEvent('message', {
          detail: {
            message: 'Datos guardados correctamente',
            type: 'success'
          }
        }))
      } catch (error) { console.error(error) }
    })
  }

  showElement = async element => {
    Object.entries(element).forEach(([key, value]) => {
      if (this.shadow.querySelector(`[name="${key}"]`)) {
        this.shadow.querySelector(`[name="${key}"]`).value = value
      }
    })
  }
}

customElements.define('form-component', Form)
