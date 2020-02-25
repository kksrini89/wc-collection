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
    
    .logo > #header-img {
        display: none;
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
        color: #333;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
    }
</style>
<header id="header">
    <div class="logo">
        <img id="header-img" alt="logo" src="https://via.placeholder.com/50/CCCCCC/333333/?text=logo"/>
        <span class="fab fa-artstation fa-2x"> Original Trumbones</span>
    </div>
    <nav id="nav-bar">
        <ul class="nav-links-container">
            <li><a href="#features" class="nav-link">Features</a></li>
            <li><a href="#how-it-works" class="nav-link">How It Works</a></li>
            <li><a href="#pricing" class="nav-link">Pricing</a></li>
        </ul>
    </nav>
</header>
`;

class TopbarComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this._links = [];
    this._logo = null;
    this._logo_regex = /(jpg|jpeg|png|svg)$/gi;
  }

  static get observedAttributes() {
    return ['logo', 'links'];
  }

  // Life cycle events
  connectedCallback() {
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$logo = this._shadowRoot.querySelector('#header-img');
    this.$linksContainer = this._shadowRoot.querySelector('.nav-links-container');

    if (this._logo) this.setLogo();

    if (this._links) this.setLinks();
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {}

  setLogo() {
    try {
      if (this._logo) {
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
      if (this._links && this._links.length) {
        const linksInput = [...this._links];

        // Clearing the container
        this.$linksContainer.innerHTML = '';

        for (const optn of linksInput) {
          const li = this.createLinks(optn);
          this.$linksContainer.appendChild(li);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  createLinks(option = null) {
    try {
      if (option) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.href = option.address;
        a.text = option.anchorText;
        li.appendChild(a);
        return li;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

customElements.define('top-bar', TopbarComponent);
