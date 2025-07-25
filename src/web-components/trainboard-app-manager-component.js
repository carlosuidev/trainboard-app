import { LitElement, css, html, nothing } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';

export class TrainboardAppManagerComponent extends LitElement {

  static get is() {
    return 'trainboard-app-manager-component';
  }

  static get properties() {
    return {
      /**
       * All the user params for search
       * @type {Object}
       * @default {}
       */
      screenParams: {
        type: Object
      },
      /**
       * All the form params for search
       * @type {Object}
       * @default {}
       */
      previewParams: {
        type: Object
      },
      /**
       * Screen type to manage
       * @type {String}
       * @default ''' 
       */
      _screenType: {
        type: String
      }
    };
  }

  static styles = [css``
    , TWStyles];

  constructor() {
    super();
    this.screenParams = {
      station: '',
      screen: '',
      language: '',
      services: [],
    };
    this.previewParams = {
      station: '',
      screen: '',
      language: '',
      services: [],
    };
    this._screenType = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('screenParams')) {
      this._screenType = 'home';
      this._createIframeUrl();
    }

    if (changedProperties.has('previewParams')) {
      this._screenType = 'preview';
      this._createIframeUrl();
    }
  }

  /**
   * Generate a custom url for the iframe based on user params
   * @returns {String}
   */
  _createIframeUrl() {
    let station = '', screen = '', language = '', services = [];
    if(this._screenType === 'home') {
      ({ station, screen, language, services } = this.screenParams);
    } else if(this._screenType === 'preview') {
      ({ station, screen, language, services } = this.previewParams);
    }
    const servicesList = this._getServices(services);
    
    const url = `https://info.adif.es/?s=${station}&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D${station}%26languages%3D${language}%26interfaz%3Dadif-gravita-${screen}%26traffic%${servicesList}%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dfalse%26font-size%3D1%23`;
    this._dispatchIframeUrlChange(this._screenType, url);
  }

  /**
   * Returns services list parsed
   * @param {Array} services 
   * @returns {String}
   */
  _getServices(services){
    if(services.length === 0){
      return `3D${services[0]}`;
    }
    return services.map((item, idx) => (idx === 0 ? `3D${item}` : `2C${item}`)).join('%');
  }

  /**
   * Send generated url
   * @param {*} mode 
   * @param {*} url 
   */
  _dispatchIframeUrlChange(mode, url) {
    this.dispatchEvent(new CustomEvent(`${TrainboardAppManagerComponent.is}-url-${mode}`, {
      bubbles: true,
      composed: true,
      detail: url
    }));
  }
}

window.customElements.define('trainboard-app-manager-component', TrainboardAppManagerComponent)
