class Notification extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('message', this.handleMessage.bind(this))
    this.render()
  }

  handleMessage (event) {
    const notificationBox = this.shadow.querySelector('.notification-box')
    notificationBox.classList.add('active')

    const notificationHeader = this.shadow.querySelector('.notification-header')
    notificationHeader.classList.add(event.detail.type)

    this.shadow.querySelector('.message').textContent = event.detail.message

    setTimeout(() => {
      notificationBox.classList.remove('active')
    }, 3000)
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      .notification-box {
        position: fixed;
        bottom: 40px;
        right: 40px;
        background-color: #4CAF50;
        color: #fff;
        padding: 40px;
        height: 5vh;
        width: 20vh;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        font-size: 1.2rem;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s;
      }

      .notification-box.active {
        opacity: 1;
        z-index: 5000;
      }

      .message p {

      }
      </style>

      <div class="notification-box">
        <div class="message">
          
        </div>
      </div>

      `
  }
}

customElements.define('notification-component', Notification)
