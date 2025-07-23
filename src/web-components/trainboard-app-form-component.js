import { LitElement, css, html, nothing } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';
import { servicesData } from '../data/constants.js';

export class TrainboardAppFormComponent extends LitElement {

  static get is() {
    return 'trainboard-app-form-component';
  }

  static get properties() {
    return {
      /**
       * Form data for the panel configuration
       * @type {Object}
       * @default {}
       */
      _formData: {
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
       * List of services
       * @type {Array}
       * @default []
       */
      servicesData: {
        type: Array
      },
      /**
       * Status of required fields
       * @type {Object}
       * @default {}
        */
      _requiredFieldStatus: {
        type: Object
      }
    };
  }

  static styles = [css`
    #station {
      outline: none;
    }`
    , TWStyles];

  constructor() {
    super();
    this._formData = {
      station: '',
      screen: '',
      language: '',
      services: [],
    };
    this.stationsData = [];
    this.languagesData = [];
    this.servicesData = [];
    this._requiredFieldStatus = {
      station: false,
      screen: false,
      services: false,
      language: false
    };
  }

  /**
  * Submit form data if all required fields are filled
  * @fires trainboard-app-form-component-submit
  */
  _submitForm() {
    if(this._checkRequiredFields()){
      this.dispatchEvent(new CustomEvent(`${TrainboardAppFormComponent.is}-submit`, {
        bubbles: true,
        composed: true,
        detail: {
          formData: this._formData
        }
      }));
    }
  }

  /**
   * Check if all required fields are filled
   * @return {Boolean}
   */
  _checkRequiredFields() {
    const newStatus = {
      station: !this._formData.station,
      screen: !this._formData.screen,
      services: this._formData.services.length === 0,
      language: !this._formData.language,
    };

    this._requiredFieldStatus = newStatus;

    const hasErrors = Object.values(newStatus).some(isInvalid => isInvalid);

    return !hasErrors;
  }

  /**
   * Reset form data to initial state
   */
  _resetForm() {
    this._formData = { 
      station: '',
      screen: '',
      language: '',
      services: [],
    };
    this._requiredFieldStatus = {
      station: false,
      screen: false,
      services: false, 
      language: false
    };
  }

  /**
   * Dispatch event to close form modal
   * @fires trainboard-app-form-component-close-modal
   */
  _closeModal() {
    this.dispatchEvent(new CustomEvent(`${TrainboardAppFormComponent.is}-close-modal`, { bubbles: true, composed: true }));
  }

  /**
   * Update form data when data is string
   * @param {String} key
   * @param {String} value
   */
  _updateForm(key, value) {
    this._formData = {
      ...this._formData,
      [key]: value
    };
  }

  /**
   * Update form data when data is array
   * @param {String} key
   * @param {String} value
   */
  _updateFormArray(key, value) {
    const currentArray = this._formData[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    this._formData = {
      ...this._formData,
      [key]: newArray
    };
  }

  /**
   * Error message label for required fields
   * @returns {Boolean}
   */
  get _errorMessageLabel() {
    return html`
      <p class="text-red-500 text-xs mt-1.5">
        ${t("trainboard-app-form-error-required-message")}
      </p>
    `;
  }

  /**
  * Template header
  * @return {TemplateResult}
  */
  get _modalHeaderTemplate() {
    return html`
    <div class="flex justify-between items-start gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold mb-2  ">${t("trainboard-app-form-title")}</h2>
        <p>${t("trainboard-app-form-subtitle")}</p>
      </div>
      <button
        class="bg-slate-100 hover:bg-slate-200 duration-300 p-2 w-10 h-10 rounded-full"
        @click="${this._closeModal}"
      >
        <img src="close_icon.svg" class="w-6 mx-auto" />
      </button>
    </div>
  `
  }

  /**
  * Template section for station selection
  * @return {TemplateResult}
  */
  get _stationSectionTemplate() {
    return html`
    <div class="flex flex-col gap-1">
      <label>${t('trainboard-app-form-label-station')}</label>
      <small class="text-slate-500">${t("trainboard-app-form-info-label-station")}</small>
      <div class="mt-4 flex gap-0 flex-wrap w-full">
        <input 
          list="stations" 
          name="station" 
          id="station" 
          placeholder="${t("trainboard-app-form-placeholder-station")}"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5" 
          @change="${e => {
            const selectedStation = this.stationsData.find(station => station.description === e.target.value);
            this._updateForm('station', selectedStation ? selectedStation.code : '');
          }}"
        />
        <datalist id="stations">
          ${this.stationsData.map(station => html`
              <option value=${station.description} data-code="${station.code}"></option>
            `)
      }
        </datalist>
      </div>
    </div>
    `
  }

  /**
   * Section template for screen type
   * * @return {TemplateResult}
   */
  get _screenTypeSectionTemplate() {
    return html`
    <div class="flex flex-col gap-1">
      <label>${t('trainboard-app-form-label-screen')}</label>
      <small class="text-slate-500">${t("trainboard-app-form-info-label-screen")}</small>
      <div class="mt-4 flex gap-0 flex-wrap">
        <button type="button" @click="${() => this._updateForm('screen', 'departures')}" class="${this._formData.screen === "departures" ? 'bg-emerald-50 border border-emerald-400 text-emerald-400' : 'bg-white border border-slate-300'} w-1/2 rounded-l-lg  cursor-pointer text-sm px-8 py-3">
          ${t("trainboard-app-form-value-screen-departures")}
        </button>
        <button type="button" @click="${() => this._updateForm('screen', 'arrivals')}" class="${this._formData.screen === "arrivals" ? 'bg-emerald-50 border border-emerald-400 text-emerald-400' : 'bg-white border border-slate-300'} w-1/2  rounded-r-lg cursor-pointer text-sm  px-8 py-3">
          ${t("trainboard-app-form-value-screen-arrivals")}
        </button>
      </div>
    </div>`
  }

  /**
  * Section template for services
  * @return {TemplateResult}
  */
  get _servicesSectionTemplate() {
    return html`
    <div class="flex flex-col gap-1">
      <label>${t('trainboard-app-form-label-services')}</label>
      <small class="text-slate-500">${t("trainboard-app-form-info-label-services")}</small>
      <div class="mt-4 flex gap-1 flex-wrap w-full">
        ${this.servicesData.map(service => html`
            <button type="button" @click="${() => this._updateFormArray('services', service.id)}" class="${this._formData.services.includes(service.id) ? 'bg-emerald-50 border border-emerald-400 text-emerald-400' : 'bg-white border border-slate-300'} rounded-lg cursor-pointer text-sm px-8 py-3">
              ${t(service.name)}
            </button>`)
        }
      </div>
    </div>
    `
  }

  /**
  * Section template for language selection
  * @return {TemplateResult}
  */
  get _languageSectionTemplate() {
    return html`
    <div class="flex flex-col gap-1">
      <label>${t('trainboard-app-form-label-language')}</label>
      <small class="text-slate-500">${t("trainboard-app-form-info-label-language")}</small>
      <div class="mt-4 flex gap-0 flex-wrap w-full">
        <select id="language"
          placeholder="${t("trainboard-app-form-placeholder-language")}"
          name="language"
          .value="${this._formData.language[0] || ''}"
          @change="${e => this._updateForm('language', [e.target.value])}"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5">
          <option value="" disabled>${t("trainboard-app-form-placeholder-language")}</option>
          ${this.languagesData.map(lang => html`
              <option value="${lang.id}">${lang.language}</option>`)
          }
        </select>
      </div>
    </div>
    `
  }

  /**
  * Form template
  * @return {TemplateResult}
  */
  get _formTemplate() {
    return html`
  <form>
    ${this._stationSectionTemplate}
    ${this._requiredFieldStatus.station 
      ? this._errorMessageLabel 
      : nothing}
    <hr class="my-8"/>
    ${this._screenTypeSectionTemplate}
    ${this._requiredFieldStatus.screen
      ? this._errorMessageLabel 
      : nothing}
    <hr class="my-8"/>
    ${this._servicesSectionTemplate}
    ${this._requiredFieldStatus.services
      ? this._errorMessageLabel 
      : nothing}
    <hr class="my-8"/>
    ${this._languageSectionTemplate}
    ${this._requiredFieldStatus.language
      ? this._errorMessageLabel 
      : nothing}
    <hr class="my-8"/>
    <div class="flex lg:flex-row md:flex-row flex-col gap-2">
    <button 
      @click="${() => this._submitForm()}" 
      type="button" class="font-semibold bg-emerald-400 text-center text-white rounded-lg px-6 py-3 cursor-pointer hover:bg-emerald-500 duration-300 text-sm">
      ${t("trainboard-app-form-button-submit")}
    </button>
    <button 
      @click="${() => this._resetForm()}" 
      type="button" class="font-medium text-center text-red-500 rounded-lg px-6 py-3 cursor-pointer hover:underline duration-300 text-sm">
      ${t("trainboard-app-form-button-reset")}
    </button>
    </div>
 </form>
  `
  }

  /**
   * Template for the Trainboard form component
   * @return {TemplateResult}
   */
  get _trainboardFormComponent() {
    return html`
    <div
  @close=${this._close}
  class="fixed inset-0 bg-slate-900/50 flex justify-center items-start p-4 overflow-y-auto z-50">
  <div class="bg-white container rounded-lg p-8 mt-10 mx-auto">
    ${this._modalHeaderTemplate}
    <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
      ${this._formTemplate}
    </div>
  </div>
</div>
`
  }

  render() {
    return this._trainboardFormComponent;
  }
}

window.customElements.define('trainboard-app-form-component', TrainboardAppFormComponent)
