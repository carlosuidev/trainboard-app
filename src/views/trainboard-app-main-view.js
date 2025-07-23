import { LitElement, css, html, nothing } from 'lit'
import { TWStyles } from '../../tw.js'
import { languagesData, stationsData, servicesData } from '../data/constants.js';
import { setLang, t } from '../../locales/locales.js';
import { TrainboardAppPanelComponent } from '../web-components/trainboard-app-panel-component.js';
import { TrainboardAppFormComponent } from '../web-components/trainboard-app-form-component.js';
import { TrainboardAppManagerComponent } from '../web-components/trainboard-app-manager-component.js';

export class TrainboardAppMainView extends LitElement {

  static get is(){
    return 'trainboard-app-main-view';
  }

  static get properties() {
    return {
      /**
      * Main url of iframe
      * @type {string}
      * @default 'https://info.adif.es/?rutaRecursos=..%2F..%2F..%2Frecursos'
      */
      _iframeUrl: { 
        type: String 
      },
      /**
      * Custom url for iframe
      * @type {Object}
      * @default ''
      */
      iframeCustomUrl: { 
        type: Object
      },
      /**
      * List of stations with id
      * @type {Array}
      * @default []
      */
      stationsData: {
        type: Array
      },
      /**
      * List of languages
      * @type {Array}
      * @default []
      */
      languagesData: {
        type: Array
      },
      /**
      * All the user params for search
      * @type {Object}
      * @default {}
      */
      screenParams: {
        type: Object
      },
      /**
      * Show templates
      * @type {Object}
      * @default {}
      */
      toggles: {
        type: Object
      },
      /**
      * Site language for locales
      * @type {String}
      * @default 'es'
      */
      language: {
        type: String
      }
    };
  }

  static styles = [css``, TWStyles];

  constructor() {
    super();
    this._iframeUrl = 'https://info.adif.es/?rutaRecursos=..%2F..%2F..%2Frecursos';
    this.iframeCustomUrl = {
      home: this._iframeUrl,
      preview: this._iframeUrl
    };
    this.screenParams = {
      station: '',
      screen: '',
      language: '',
      services: [],
    };
    this.toggles = {
      form: false
    };
    this.language = 'es';
    this.stationsData = stationsData || [];
    this.languagesData = languagesData || [];
    this.servicesData = servicesData || [];
  }

  /**
  * Template for the trainboard manager component 
  * @return {TemplateResult}
  */
  get trainboardManagerTemplate() {
    return html`
      <trainboard-app-manager-component
        .screenParams="${this.screenParams}"
        .previewParams="${this.previewParams}"
        @trainbboard-app-manager-component-url-home=${(e) => this._updateUrl('home', e.detail.url)}
        @trainbboard-app-manager-component-url-preview=${(e) => this._updateUrl('preview', e.detail.url)}
      ></trainboard-app-manager-component>`;
  }

  _updateUrl(mode, url) {
    this.iframeCustomUrl = url;
  }


  /**
  * Screen template
  * @return {TemplateResult}
  */
  get _iframePanelTemplate() {
    return html`
      <trainboard-app-panel-component
        .customUrl="${this.iframeCustomUrl.home}"
        .screenParams="${this.screenParams}"
        @trainboard-app-panel-component-open-modal=${this._openModal}
      ></trainboard-app-panel-component>`
  }

  /**
  * Form modal template
  * @return {TemplateResult}
  */
  get _iframeFormTemplate(){
    return html`
      <trainboard-app-form-component
        .customUrl="${this.iframeCustomUrl.preview}"
        .stationsData="${this.stationsData}"
        .languagesData="${this.languagesData}"
        .servicesData="${this.servicesData}"
        @trainboard-app-form-component-close-modal=${this._closeModal}
        @trainboard-app-form-component-submit=${this._handleFormSubmit}
      ></trainboard-app-form-component>
    `
  }

  /**
   * Handle form submit event
   * @param {*} e Form data
   */
  _handleFormSubmit(e) {
    const formData = e?.detail?.formData;
    this.toggles = {
      ...this.toggles,
      form: false
    };
    this.screenParams = formData;
  }

  /**
  * Header template
  * @return {TemplateResult}
  */
  get _headerTemplate() {
    return html`
      <div class="bg-slate-900 px-2 py-3 flex justify-center items-center">
        <div class="container text-white flex justify-between items-center flex-wrap">
          <div class="flex gap-4 items-center justify-center px-2">
            <img 
              src="trainboard_logo.svg" 
              alt="${t("trainboard-app-main-logo-white-alt")}" 
              class="lg:w-20 md:w-20 w-20 pb-2"/>
            <div class="border-l-2 ps-4">
              <h1 class="font-bold text-xl">${t("trainboard-app-main-header-title")}</h1>
              <h2 class="text-xs uppercase font-semibold">${t("trainboard-app-main-header-subtitle")}</h2>
            </div>
          </div>
          <div class="flex gap-2 items-center justify-center">
            <button 
              @click="${() => this._setLanguge('es')}"
              class="${this.language === 'es' ? 'bg-slate-700' : ''} rounded-lg px-3 text-xs uppercase font-semibold py-1.5 hover:bg-slate-600 duration-300">
                ${t("trainboard-app-main-language-es")}
            </button>
            <button 
              @click="${() => this._setLanguge('en')}"
              class="${this.language === 'en' ? 'bg-slate-700' : ''} rounded-lg px-3 text-xs uppercase font-semibold py-1.5 hover:bg-slate-600 duration-300">
                ${t("trainboard-app-main-language-en")}
            </button>
          </div>
        </div>
      </div>
    `
  }

  /**
  * Template message with a disclaimer
  * @return {TemplateResult}
  */
  get _disclaimerTemplate(){
    return html`
      <div class="bg-yellow-100 text-yellow-600 rounded-lg w-full px-6 py-3 mb-4">
        <p class="text-sm text-center text-balance">
          <span class="font-bold">${t("trainboard-app-main-disclaimer-label")}</span>${t("trainboard-app-main-disclaimer-text")}
        </p>
      </div>`
  }

  /**
  * Updates locales language
  * @param {String} lang 
  */
  _setLanguge(lang){
    this.language = lang;
    setLang(lang);
  }

  /**
  * Set true modal to open form
  */
  _openModal(){
    this.toggles = {
      ...this.toggles,
      form: true
    }
  }

  /**
  * Set false modal to close form
  */
  _closeModal() {
    this.toggles = {
      ...this.toggles,
      form: false
    }
  }

  /**
  * Body template
  * @return {TemplateResult}
  */
  get _bodyTemplate() {
    return html`
      <div class="px-2 py-4 flex justify-center items-center">
        <div class="container">
          <div>
            ${this._disclaimerTemplate}
            ${this._iframePanelTemplate}
          </div>
        </div>
      </div>
    `
  }

  /**
  * Main structure template
  * @return {TemplateResult}
  */
  get _mainStructureTemplate() {
    return html`
      ${this.trainboardManagerTemplate}
      <div class="bg-slate-100 min-h-screen text-slate-900">
        ${this._headerTemplate}
        ${this._bodyTemplate}
        ${this.toggles?.form === true 
          ? this._iframeFormTemplate 
          : nothing}
      </div>`
  }

  render() {
    return this._mainStructureTemplate;
  }
}

window.customElements.define('trainboard-app-main-view', TrainboardAppMainView)
