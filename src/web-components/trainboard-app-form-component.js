import { LitElement, css, html } from 'lit'
import { TWStyles } from '../../tw.js';
import { t } from '../../locales/locales.js';

export class TrainboardAppFormComponent extends LitElement {

  static get is() {
    return 'trainboard-app-form-component';
  }

  static get properties() {
    return {
    };
  }

  static styles = [css``, TWStyles];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  /**
   * If user press 'escape' key will dispatch an event to close the form modal
   */
  _handleKeydown(e) {
     if (e.key == 'Escape') {
      this._closeModal;
    }
  }

  /**
   * Dispatch event to close form modal
   * @fires trainboard-app-form-component-close-modal
   */
  _closeModal() {
    this.dispatchEvent(new CustomEvent(`${TrainboardAppFormComponent.is}-close-modal`, { bubbles: true, composed: true }));
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
  * Form template
  * @return {TemplateResult}
  */
 get _formTemplate(){
  return html`
  <form>
    <div class="flex flex-col gap-1">
      <label>${t('trainboard-app-form-label-screen')}</label>
      <small class="text-slate-500">¿Qué prefieres que se visualice?</small>
      <div class="mt-4 flex gap-0 flex-wrap">
        <button @click="${this._update}" class="w-1/2 rounded-l-lg  curor-pointer text-sm bg-emerald-50 border border-emerald-400 text-emerald-400 px-8 py-3">Salidas</button>
        <button @click="${this._update}" class="w-1/2  rounded-r-lg curor-pointer text-sm bg-white border border-slate-300 px-8 py-3">Legadas</button>
      </div>
    </div>

    <hr class="my-8"/>

    <div>
      <label>${t('trainboard-app-form-label-screen')}</label>
      <div class="mt-4 flex gap-0 flex-wrap">
        <button class="curor-pointer text-sm bg-emerald-50 border border-emerald-400 text-emerald-400 rounded-lg px-8 py-3">Salidas</button>
        <button class="curor-pointer text-sm bg-white border border-slate-300 rounded-lg px-8 py-3">Legadas</button>
      </div>
    </div>
  </form>
  `
 }

 get _trainboardFormComponent() {
  return html`
    <div
      @close=${this._close}
      class="fixed top-0 w-full min-h-screen bg-slate-900/50 flex justify-center items-center px-4"
    >
      <div class="bg-white container rounded-lg p-8 mx-auto overflow-auto">
        ${this._modalHeaderTemplate}
        <div class="grid grid-cols-2 gap-4">
          ${this._formTemplate}
        </div>
      </div>
    </div>`
 }

  render() {
    return this._trainboardFormComponent;
  }

}

window.customElements.define('trainboard-app-form-component', TrainboardAppFormComponent)
