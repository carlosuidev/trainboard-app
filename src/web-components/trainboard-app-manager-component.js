import { LitElement, css, html, nothing } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';

export class TrainboardAppManagerComponent extends LitElement {

  static get is() {
    return 'trainboard-app-manager-component';
  }

  static get properties() {
    return {
    };
  }

  static styles = [css``
    , TWStyles];

  constructor() {
    super();
  }
}

window.customElements.define('trainboard-app-manager-component', TrainboardAppManagerComponent)
