const template = document.createElement('template');
template.innerHTML = `
<style>
    #header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 0px;
        position: fixed;
        width: 100%;
        top: 0;
        min-height: 30px;
        background: var(--bg-color);
    }
    
    .logo {
        margin-left: 5%;
        width: 60%;
    }

    .logo a {
      text-decoration: none;
      line-height: 10px;
    }
    
    .logo #header-img {
        height: auto;
        width: 100%;
        max-width: 40px;
        vertical-align: middle;
        margin: auto;
    }
    
    #header > #nav-bar {
        width: 30%;
    }
    
    #header > #nav-bar .nav-links-container {
        display: flex;
        justify-content: flex-start;
        list-style: none;
    }
    
    #header > #nav-bar .nav-links-container li{
        margin: 0 15px;
    }
    
    #header > #nav-bar .nav-links-container li a:hover {
        cursor: pointer;
    }
    
    #header > #nav-bar > .nav-links-container .nav-link {
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
    }

    .link-style {
      color: #fff;
    }
</style>
<header id="header">
    <div class="logo">
        <a href="javascript: void(0);" class="link-style">
          <img id="header-img" alt="logo" src="https://via.placeholder.com/50/CCCCCC/333333/?text=logo"/>
          <slot name="logo_title"></slot>
        </a>
    </div>
    <nav id="nav-bar">
        <ul class="nav-links-container"></ul>
    </nav>
</header>
`;

class TopbarComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this._links = [];
    this._logo = null;
    this._defaultLogo = 'https://via.placeholder.com/50/CCCCCC/333333/?text=logo';
    this._logo_regex = /(jpg|jpeg|png|svg)$/gi;
  }

  static get observedAttributes() {
    return ['logo', 'links', 'config'];
  }

  // Life cycle events
  connectedCallback() {
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$header = this._shadowRoot.querySelector('#header');
    this.$logo = this._shadowRoot.querySelector('#header-img');
    this.$linksContainer = this._shadowRoot.querySelector('.nav-links-container');

    // hit 2, from web component
    if (this._logo) this.setLogo();

    // if (this._links && this._links.length) this.setLinks();

    // if (this._config) this.setHeaderConfig();

  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {
    // hit 1, from html
    if (name === 'logo') {
      this._logo = newVal || this._defaultLogo;
      this.setLogo();
    }

    // hit 3, from main javascript file
    if (name === 'links') {
      this._links = JSON.parse(newVal);
      this.setLinks();
    }

    // hit 4, from main javascript file
    if (name === 'config') {
      this['_config'] = JSON.parse(newVal);
      this.setHeaderConfig();
    }
  }

  setHeaderConfig() {
    try {
      if (this.$header && this._config) {
        const { 'bg-color': bgColor } = this._config;
        bgColor && (this.$header.style.backgroundColor = bgColor);
      }
    } catch (error) {
      console.error(error);
    }
  }

  setLogo() {
    try {
      if (this._logo && this.$logo) {
        if (this._logo_regex.test(this._logo.toString())) {
          this.$logo.src = this._logo;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  setLinks() {
    try {
      if (this._links && this._links.length && this.$linksContainer) {
        const linksInput = [...this._links];

        // Clearing the container
        this.$linksContainer.innerHTML = '';

        // To create the menu link
        const createLinks = (option = null) => {
          try {
            if (option) {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.classList.add('nav-link');
              a.classList.add('link-style');
              a.href = option.address;
              a.text = option.anchorText;
              li.appendChild(a);
              return li;
            }
          } catch (error) {
            console.error(error.message);
          }
        };

        for (const optn of linksInput) {
          const li = createLinks(optn);
          this.$linksContainer.appendChild(li);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define('vj-top-bar', TopbarComponent);
