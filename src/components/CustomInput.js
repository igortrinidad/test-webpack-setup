const template = document.createElement("template");
template.innerHTML = `
<style> 
  :host { 
    margin-bottom: 10px; 
    display: block; 
    width: 100%;
  } 
  .invalid-field { 
    border: 2px solid #FF000060; 
  } 
  .invalid-field:focus { 
  } 
  .form-field { 
    display: flex;
    flex-direction: column; 
  } 
  input { 
    padding: 8px 12px;
    border-radius: 4px;
    border: 2px solid #CCCCCC50;
    outline: 0px;
    background-color: #FFFFFF50;
    box-shadow: 0 25px 60px rgba(0,34,119,0.17);
  } 
  label { 
    padding-right: 10px; 
  } 
  .error { 
    display: block; 
  } 
  .hidden { 
    display: none; 
  } 
  ::slotted(span) { 
    color: grey; 
    font-style: italic; 
    padding-left: 10px; 
  } 
</style> 

<div class="form-field"> 
  <label></label> 
  <input /> 
  <slot></slot> 
  <span class="error hidden"></span> 
</div>`;

class CustomInput extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$label = this.shadowRoot.querySelector("label")
    this.$input = this.shadowRoot.querySelector("input")
    this.$error = this.shadowRoot.querySelector(".error")
  }

  static get observedAttributes() {
    return ["value", "label", "type", "error-message", "invalid"]
  }

  onBlurInput(event) {
    if (!event.target.value && this.hasAttribute("required")) {
      this.invalid = true
      this.$error.innerText = "This field is required."
    } else {
      this.invalid = false
      this.value = event.target.value
    }
  }

  connectedCallback() {
    if (this.$input.isConnected) {
      this.$input.addEventListener("blur", this.onBlurInput.bind(this))
    }
  }


  disconnectedCallback() {
    this.$input.removeEventListener("blur", this.onBlurInput.bind(this))
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.$label.innerText = newValue
        break;
      case "type":
        this.$input.type = newValue
        break;
      case "error-message":
        this.$error.innerText = newValue
        break;
      case "invalid":
        this._handleInvalidState(newValue)
        break;
      default:
        break;
    }
  }

  get invalid() {
    return this.hasAttribute("invalid")
  }

  set invalid(value) {
    if (!!value) {
      this.setAttribute("invalid", "")
    } else {
      this.removeAttribute("invalid")
    }
  }

  get value() {
    return this.getAttribute("value")
  }

  set value(newValue) {
    this.setAttribute("value", newValue)
    this._handleInvalidState(null)
  }

  _handleInvalidState(value) {
    if (value !== null) {
      this.$error.classList.remove("hidden")
      this.$input.classList.add("invalid-field")
    } else {
      this.$error.classList.add("hidden")
      this.$input.classList.remove("invalid-field")
    }
  }
}

window.customElements.define("custom-input", CustomInput);