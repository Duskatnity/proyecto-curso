class ModalDestroy extends HTMLElement {
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
          height: 15vh;
          padding: 1rem;
          width: 30%;
        }
        
        .modal-header h4{
          color: hsl(0, 0%, 0%);
          font-size: 1.2rem;
          font-weight: 600;
          text-align: center;
        }

        .modal-body{
          align-items: center;
          display: flex;
          gap: 1rem;
          height: 100%;
          justify-content: center;
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
          <div class="modal-header">
            <h4>¿Quieres eliminar este registro?</h4>
          </div>
          <div class="modal-body">
            <div class="destroy-button confirmation-button">
              <button>Si</button>
            </div>
            <div class="destroy-button cancel-button">
              <button>No</button>
            </div>
          </div>
        </div>
      </div>

      `

    const confirmButton = this.shadow.querySelector('confirmation-button')

    confirmButton.addEventListener('click', () => {

    })

    const cancelButton = this.shadow.querySelector('cancel-button')

    cancelButton.addEventListener('click', () => {

    })
  }
}

customElements.define('destroy-component', ModalDestroy)
