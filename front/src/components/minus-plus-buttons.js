class MinusPlusButtons extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.productId = this.getAttribute('product-id')
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .plus-minus-button {
          margin-top: 1rem;
          margin-bottom: 1rem;
          margin-left: 5rem;
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
          width: 10px;
          border: none;
          background-color: #f0f0f0;

        }

        .quantity-selector.input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
          cursor: none;
        }
      </style>

      <div class="plus-minus-button">
        <button class="minus" aria-label="Decrease by one">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" class="icon"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" fill="#000000"></path> <path d="M16 12.75H8C7.80109 12.75 7.61032 12.671 7.46967 12.5303C7.32902 12.3897 7.25 12.1989 7.25 12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25H16C16.1989 11.25 16.3897 11.329 16.5303 11.4697C16.671 11.6103 16.75 11.8011 16.75 12C16.75 12.1989 16.671 12.3897 16.5303 12.5303C16.3897 12.671 16.1989 12.75 16 12.75Z" fill="#000000"></path> </g></svg>        
        </button>
        <input class="quantity-selector" type="number" value="1">
        <button class="plus" aria-label="Increase by one">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" class="icon"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" fill="#000000"></path> <path d="M12 16.75C11.8019 16.7474 11.6126 16.6676 11.4725 16.5275C11.3324 16.3874 11.2526 16.1981 11.25 16V8C11.25 7.80109 11.329 7.61032 11.4697 7.46967C11.6103 7.32902 11.8011 7.25 12 7.25C12.1989 7.25 12.3897 7.32902 12.5303 7.46967C12.671 7.61032 12.75 7.80109 12.75 8V16C12.7474 16.1981 12.6676 16.3874 12.5275 16.5275C12.3874 16.6676 12.1981 16.7474 12 16.75Z" fill="#000000"></path> <path d="M16 12.75H8C7.80109 12.75 7.61032 12.671 7.46967 12.5303C7.32902 12.3897 7.25 12.1989 7.25 12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25H16C16.1989 11.25 16.3897 11.329 16.5303 11.4697C16.671 11.6103 16.75 11.8011 16.75 12C16.75 12.1989 16.671 12.3897 16.5303 12.5303C16.3897 12.671 16.1989 12.75 16 12.75Z" fill="#000000"></path> </g></svg>        </button>
      </div>
      `

    const plusMinusButton = this.shadow.querySelector('.plus-minus-button')

    plusMinusButton.addEventListener('click', event => {
      if (event.target.closest('.plus')) {
        const quantity = this.shadow.querySelector('.quantity-selector')
        quantity.value = (parseInt(quantity.value) + 1)

        store.dispatch(addProduct({
          id: this.productId,
          quantity: parseInt(quantity.value)
        }))
      }

      if (event.target.closest('.minus')) {
        const quantity = this.shadow.querySelector('.quantity-selector')
        if (quantity.value > 1) {
          quantity.value = (parseInt(quantity.value) - 1)

          store.dispatch(addProduct({
            id: this.productId,
            quantity: parseInt(quantity.value)
          }))
        }
      }
    })
  }
}

customElements.define('minus-plus-component', MinusPlusButtons)
