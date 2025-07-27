import { LitElement, css, html } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';
import { stationsData, servicesData, languagesData } from '../data/constants.js';


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
      /**
      * All the user params for search
      * @type {Object}
      * @default {}
      */
      screenParams: {
        type: Object
      }
    };
  }

  static styles = [css`
    iframe {
      height: 1400px;
    }
    `, TWStyles];

  constructor() {
    super();
    this.customUrl = '';
    this.screenParams = {
      station: '',
      screen: '',
      language: '',
      services: [],
    };
  }

  /**
   * Returns service names from codes
   * @param {Array} ids 
   * @returns {String}
   */
  _parseServiceCodes(ids = []){
    if (!ids || ids.length === 0) {
      return '-';
    }
    return ids.map(id => {
      const service = servicesData.find(s => s.id === id);
      return service ? t(service.name) : id;
    }).join(', ');
  }

  /**
   * Returns language name from code
   * @param {String} code 
   * @returns {String}
  */
  _parseLanguageCode(code){
    if (!code) {
      return '-';
    }
    const language = languagesData.find(lang => lang.id === code);
    return language ? language.language : code;
  }

  /**
   * Returns station name
   * @param {Number} id 
   * @returns {String}
   */
  _parseStationCode(id){
    return stationsData.find(station => station.code === id)?.description;
  }

  /**
  * Scren with iframe template
  * @return {TemplateResult}
  */
  get _screenIframeTemplate() {
    return html`
      <div class="screen-container  container mx-auto bg-white lg:p-8 md:p-8 p-4 rounded-lg">
        ${this._screenHeaderTemplate}
        <iframe 
          src="${this.customUrl}" 
          class="w-full rounded-lg duration-300"></iframe>
        ${this._externalLinkTemplate}
      </div>
    `
  }

  /**
  * Section to go outside
  * @return {TemplateResult}
  */
  get _externalLinkTemplate(){
    return html`
    <div class="external-container  pt-2 text-xs flex flex-col items-center gap-2">
      <div class="copy-box  border rounded-lg bg-slate-100 p-2 lg:flex md:hidden hidden">
       <p>${this._parseCustomUrl(this.customUrl)}</p>
      </div>
      <a
      href="${this._parseCustomUrl(this.customUrl)}"
      target="_blank"
      class="w-full flex justify-center gap-1 items-center font-semibold bg-emerald-400 text-center text-white rounded-lg px-6 py-3 cursor-pointer hover:bg-emerald-500 duration-300 text-sm">
      <img src="output_icon.svg" class="w-5" />
      </a>
    </div>
    `
  }

  /**
   * Add header to the url
   * @param {String} url 
   * @returns {String}
   */
  _parseCustomUrl(url) {
      if (!url) return '';
      const lastFalseIndex = url.lastIndexOf('false');
      if (lastFalseIndex === -1) return url;
      return (
      url.substring(0, lastFalseIndex) +
      'true' +
      url.substring(lastFalseIndex + 'false'.length)
      );
    }

  /**
  * Template header of screen
  * @return {TemplateResult}
  */
  get _screenHeaderTemplate(){
    const station = this._parseStationCode(this.screenParams?.station) || '-';
    let screen = '-';
    if (this.screenParams?.screen === 'departures') {
      screen = t('trainboard-app-form-value-screen-departures');
    } else if (this.screenParams?.screen === 'arrivals') {
      screen = t('trainboard-app-form-value-screen-arrivals');
    }
    const services = this._parseServiceCodes(this.screenParams?.services);
    const language = this._parseLanguageCode(this.screenParams?.language) || '-';
    return html`
      <div id="screen-header" class="mb-8 flex justify-between items-center grid lg:grid-cols-5 md:grid-cols-3 grid-cols-3 gap-4">
        <div class="label  screen-content  px-3 py-3 bg-emerald-100 rounded lg:col-span-1 md:col-span-4 col-span-4">
          <p class="text-2xl font-bold italic text-center text-emerald-500">${screen}</p>
        </div>
        <div class="station-content  text-sm self-start lg:col-span-1 md:col-span-1 col-span-1">
          <p class="label  font-bold">${t("trainboard-app-panel-label-station")}</p>
          <p class="description">${station}</p>
        </div>
        <div class="services-content  text-sm self-start lg:col-span-1 md:col-span-1 col-span-1">
          <p class="label  font-bold">${t("trainboard-app-panel-label-services")}</p>
          <p class="description">${services}</p>
        </div>
        <div class="language-content  text-sm self-start lg:col-span-1 md:col-span-1 col-span-1">
          <p class="label  font-bold">${t("trainboard-app-panel-label-language")}</p>
          <p class="description">${language}</p>
        </div>
        <button
          @click="${this._fireOpenModal}"
          class="lg:col-span-1 md:col-span-3 col-span-3 w-full flex justify-center gap-1 items-center font-semibold bg-emerald-400 text-center text-white rounded-lg px-6 py-3 cursor-pointer hover:bg-emerald-500 duration-300 text-sm">
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
