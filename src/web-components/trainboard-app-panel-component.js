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
      * Main url of iframe
      * @type {string}
      * @default 'https://info.adif.es/?rutaRecursos=..%2F..%2F..%2Frecursos'
      */
      iframeUrl: { 
        type: String 
      },
      /**
      * Custom url with params
      * @type {string}
      * @default ''
      */
      iframeCustomUrl: { 
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
    this.iframefUrl = '';
    this.iframeCustomUrl = '';
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
          src="https://info.adif.es/?s=17000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D17000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DC%26subtitle%3DCERC%26countdown%3Dtrue%26show-access%3Dfalse%26show-platform%3Dtrue%26show-product%3Dfalse%26show-number%3Dfalse%26show-platform-preview%3Dtrue%26show-header%3Dtrue%26font-size%3D1%23" 
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
