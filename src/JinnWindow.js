import { jsPanel } from '../node_modules/jspanel4/es6module/jspanel.js';

/**
 * Wraps jsPanel4 and exposes a small subset of it as web component.
 *
 * JinnWindow provides a slot 'icon' to plugin an icon acting as button
 * for opening the window. Note that the 'open' marker attribute should not
 * be present in this case.
 *
 * Current limitations:
 * due to limited functionality with '::slotted' selector currently only
 * 'img' and 'svg' elements are supported.
 */
export class JinnWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const style = `
          :host {
            display: block;
            background: transparent;
          }
          // .container{
          //   position:fixed;
          //   left:0;
          //   top:0;
          //   z-index:-1;
          //   width:100vw;
          //   height:100vh;
          // }
          #default{
            display:none;
          }
          
          button{
            background:transparent;
            border:none;
            cursor:pointer;
          }
          
          ::slotted(*){
            max-width:128px;
            max-height:128px;
            display: none;
          }
          
          slot[name=icon]::slotted(*){
            display:inline-block;
          }
        `;

    const html = `
          <button id="iconBtn"><slot name="icon"></slot></button> 
          <div class="container">
            <slot></slot>
          </div>
        `;

    this.shadowRoot.innerHTML = `
            <style>
                ${style}
            </style>
            ${html}
        `;

    /**
     * title of window to show on window handle
     * @type {string|null}
     */
    this.title = this.hasAttribute('title') ? this.getAttribute('title') : null;
    /**
     * name of window for referral
     * @type {string|null}
     */
    this.name = this.hasAttribute('name') ? this.getAttribute('name') : null;
    /**
     * position of window in viewport. Defaults to 'center'
     * @type {string|string}
     */
    this.position = this.hasAttribute('position')
      ? this.getAttribute('position')
      : 'center';
    /**
     * wether or not to snap windows to corners and border centers
     * @type {string|string}
     */
    this.snap = this.hasAttribute('snap') ? this.getAttribute('snap') : 'true';
    /**
     * the set of header icons to display.
     * @type {string|string}
     */
    this.headercontrols = this.hasAttribute('headercontrols')
      ? this.getAttribute('headercontrols')
      : 'minimize smallify close normalize';
    /**
     * sizing the window with space-separated X,Y values
     * @type {string|string}
     */
    this.size = this.hasAttribute('size') ? this.getAttribute('size') : 'auto';
    this.panel = null;

    const iconBtn = this.shadowRoot.getElementById('iconBtn');
    iconBtn.addEventListener('click', () => {
      this.open();
    });

    if (this.hasAttribute('open') && !this.panel) {
      this.open();
    }

    document.addEventListener('jspanelclosed',ev => {
      this.panel = null;
    }, false);
  }

  open() {
    if (this.panel) {
      return;
    }

    // ### grabbing the content from the default slot which is second in template
    const template = this.querySelector('template');
    if (!template) {
      console.error('no template specified');
      return;
    }
    const clone = document.importNode(template.content, true);

    // ### create wrapper div to hold content
    const result = document.createElement('div');
    result.appendChild(clone);
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
      content: result,
    });

    const event = new CustomEvent('window-opened', {
      composed: true,
      bubbles: true,
      detail: { title: this.title, name: this.name , content:result},
    });

    this.dispatchEvent(event);
  }

}
if (!customElements.get('jinn-window')) {
  customElements.define('jinn-window', JinnWindow);
}

