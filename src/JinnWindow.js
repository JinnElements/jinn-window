import { jsPanel } from '../node_modules/jspanel4/es6module/jspanel.min.js';

export class JinnWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background: transparent;
        position: absolute;
        z-index: -1;
      }
      ::slotted(*){
      display: none;
      }
    `;

    const html = `
      <slot></slot>
    `;

    this.shadowRoot.innerHTML = `
        <style>
            ${style}
        </style>
        ${html}
    `;

    this.title = this.hasAttribute('title') ? this.getAttribute('title') : null;
    this.name = this.hasAttribute('name') ? this.getAttribute('name') : null;
    this.position = this.hasAttribute('position')
      ? this.getAttribute('position')
      : 'center';
    this.snap = this.hasAttribute('snap') ? this.getAttribute('snap') : 'true';
    this.headercontrols = this.hasAttribute('headercontrols')
      ? this.getAttribute('headercontrols')
      : 'minimize smallify close';
    this.size = this.hasAttribute('size') ? this.getAttribute('size') : 'auto';
    this.panel = null;

    const slot = this.shadowRoot.querySelector('slot');

    // eslint-disable-next-line no-unused-vars
    slot.addEventListener('slotchange', event => {
      if (this.hasAttribute('open') && !this.panel) {
        this.open();
      }
    });
  }

  open() {
    this.panel = jsPanel.create({
      headerTitle: this.title,
      theme: 'light',
      contentSize: this.size,
      position: this.position,
      dragit: {
        snap: this.snap,
      },
      headerControls: {
        minimize: this.headercontrols.includes('minimize') ? 'true' : 'remove',
        smallify: this.headercontrols.includes('smallify') ? 'true' : 'remove',
        close: this.headercontrols.includes('close') ? 'true' : 'remove',
        maximize: this.headercontrols.includes('maximize') ? 'true' : 'remove',
        normalize: this.headercontrols.includes('normalize')
          ? 'true'
          : 'remove',
      },
      content: this.innerHTML,
    });

    const event = new CustomEvent('window-opened', {
      composed: true,
      bubbles: true,
      detail: { title: this.title, name: this.name },
    });

    this.dispatchEvent(event);
  }
}

customElements.define('jinn-window', JinnWindow);
