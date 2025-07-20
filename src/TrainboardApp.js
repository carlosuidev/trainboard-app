import { LitElement, css, html } from 'lit'
import { TWStyles } from '../tw.js';
import { Router } from '@vaadin/router';
import { TrainboardAppMainView } from './views/trainboard-app-main-view.js';

export class TrainboardApp extends LitElement {

  static get properties() {
    return {};
  }

  static styles = [css``, TWStyles];

  constructor() {
    super()
  }

  firstUpdated() {
    super.firstUpdated();
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'trainboard-app-main-view' },
      { path: '(.*)', redirect: '/' },
    ]);
  }

  render() {
    return  html`<div id="outlet"></div>`;
  }
  
}

window.customElements.define('trainboard-app', TrainboardApp)
