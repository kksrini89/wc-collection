// HTML - Template Markup

const tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>
  .container > .carousel {
    display: flex;
    margin-top: 5%;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
  }
  .carousel > .carousel-item {
    width: 15px;
    height:15px;
    background-color: var(--default-carousel-bg-color);
    border-radius: 50%;
    margin-left: 5px;
  }
  
  .carousel-item:hover {
    cursor: pointer;
  }
  
  .selected-carousel {
    background-color: var(--selected-carousel-bg-color);
  }
  .message {
    color: red;
    text-align: center;
  }
</style>
<div class="container">
<div class="message"><slot name="default"></slot></div>
<div class="carousel"></div>
</div>`;

// Custom Elements - Shadow DOM
class AutoCarouselComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.carouselContainer = '';
    this.carouselItems = '';

    this.createCarouselItem = this.createCarouselItem.bind(this);
    this.generateCarouselItems = this.generateCarouselItems.bind(this);
    this.selectCarouselByDefault = this.selectCarouselByDefault.bind(this);
  }

  static get observedAttributes() {
    return ['length'];
  }

  // Life Cycle Events
  connectedCallback() {
    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

    //   element references
    this.carouselContainer = this._shadowRoot.querySelector('.carousel');
    this.carouselItems = this._shadowRoot.querySelectorAll('.carousel-item');
    this.defaultText = this.shadowRoot.querySelector('slot[name="default"]');

    if (!this._length) {
      if (this.defaultText) {
        this.defaultText.textContent = `There is no container elements!!!`;
      }
    } else {
      this.generateCarouselItems();
      this.selectCarouselByDefault();
    }
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    this._length = newVal > 0 ? newVal : 1;
  }

  generateCarouselItems() {
    //   1. Find profile items count
    if (this._length) {
      while (this._length > 0) {
        //   2. Create as many carousel item with createCarouselItem method
        const carouselItem = this.createCarouselItem();
        //   3. Insert, created carousel items to carousel container
        this.carouselContainer.appendChild(carouselItem);
        this._length--;
      }
    }
  }

  // Event Handlers
  // To create carousel item
  createCarouselItem() {
    let div = document.createElement('div');
    div.classList.add('carousel-item');
    div.addEventListener('click', this.toggleCarouselItem.bind(this));
    if (this.carouselContainer) {
      this.carouselContainer.appendChild(div);
    }
    return div;
  }

  selectCarouselByDefault() {
    let firstCarousel = this.carouselContainer.firstElementChild;
    const styles = getComputedStyle(document.documentElement);
    const selectedColor = styles.getPropertyValue('--selected-carousel-bg-color');
    firstCarousel.style.backgroundColor = selectedColor;
    firstCarousel.classList.add('selected-carousel');
  }

  toggleCarouselItem(e) {
    const items = this._shadowRoot.querySelectorAll('.carousel-item.selected-carousel');
    if (items) {
      // Remove selected-carousel css class
      Array.from(items).forEach(function(item) {
        item.classList.remove('selected-carousel');
        item.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--default-carousel-bg-color');
      });
    }
    const currentElement = e.target;
    if (currentElement) {
      currentElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--selected-carousel-bg-color');
      currentElement.classList.add('selected-carousel');
    }
  }
}

customElements.define('auto-carousel', AutoCarouselComponent);
