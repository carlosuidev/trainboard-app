import { LitElement, css, html } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';

export class TrainboardAppPanelComponent extends LitElement {

  static get is(){
    return 'trainboard-app-panel-component';
  }

  static get properties() {
    return {
      /**
      * Custom url with params
      * @type {string}
      * @default ''
      */
      customUrl: { 
        type: String 
      },
    };
  }

  static styles = [css`
    iframe {
      height: 620px;
    }
    `, TWStyles];

  constructor() {
    super();
    this.customUrl = '';
  }

  /**
  * Scren with iframe template
  * @return {TemplateResult}
  */
  get _screenIframeTemplate() { 
    return html`
      <div class="container mx-auto bg-white lg:p-8 md:p-8 p-4 rounded-lg">
        ${this._screenHeaderTemplate}
        <iframe 
          src="${this.customUrl}" 
          class="w-full rounded-lg duration-300"></iframe>
      </div>
    `
  }

  /**
  * Template header of screen
  * @return {TemplateResult}
  */
  get _screenHeaderTemplate(){
    return html`
      <div class="mb-8 flex justify-between items-center grid grid-cols-3 gap-4">
        <div>
          <p class="font-bold">Estación</p>
          <p>Chamartin</p>
        </div>
        <button>a</button>
        <button
          @click="${this._fireOpenModal}"
          class="flex justify-center gap-1 items-center font-semibold bg-emerald-400 text-center text-white rounded-lg px-6 py-3 cursor-pointer hover:bg-emerald-500 duration-300 text-sm">
          <img src="settings_icon.svg" class="w-5" /><span>${t("trainboard-app-panel-button-config")}</span>
        </button>
      </div>
    `
  }

  /**
  * Dispatch open modal event
  * @fires traiboard-app-panel-component-open-modal
  */
  _fireOpenModal(){
    this.dispatchEvent(new CustomEvent(`${TrainboardAppPanelComponent.is}-open-modal`, {
      bubbles: true,
      composed: true
    }));
  }
  
  render() {
    return html`
      ${this._screenIframeTemplate}
    `
  }
  
}

window.customElements.define('trainboard-app-panel-component', TrainboardAppPanelComponent)
