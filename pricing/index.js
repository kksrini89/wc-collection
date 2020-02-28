const template = document.createElement('template');
template.innerHTML = `
<div class="container">
    <div class="pricing-container">
      <div class="silver"></div>
      <div class="gold"></div>
      <div class="platinum"></div>
    </div>
</div>
`;

class PricingComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['pricing-count', 'options'];
  }

  connectedCallback() {
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$pricingContainer = this._shadowRoot.querySelector('.pricing-container');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'pricing-count') {
      this['_pricing-count'] = newVal;
    }
    if (name === 'options') {
      this['_options'] = JSON.parse(newVal);
    }
  }
}

customElements.define('vj-pricing', PricingComponent);
