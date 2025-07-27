import { html, fixture } from '@open-wc/testing';
import '../src/web-components/trainboard-app-manager-component.js';
import { TrainboardAppManagerComponent } from '../src/web-components/trainboard-app-manager-component.js';
import { t } from '../locales/locales.js';
import { assert } from 'chai';
import sinon from 'sinon';
import { formUserData2 } from './mocks.js';


describe('<trainboard-app-manager-component>', () => {
  let el;
  let url = 'http://localhost:8000/';

  beforeEach(async () => {
    el = await fixture(html`<trainboard-app-manager-component></trainboard-app-manager-componentw>`);
  });

  it('It renders correctly', () => {
    assert.exists(el);
  });

  it('It has shadow DOM', () => {
    assert.exists(el.shadowRoot);
  });

  it('It should return component name', () => {
    assert.deepEqual(TrainboardAppManagerComponent.is, 'trainboard-app-manager-component');
  });

  it('It should return formatted service string when only one service is provided', () => {
    const result = el._getServices(['L']);
    assert.strictEqual(result, '3DL');
  });

  it('It should dispatch trainboard-app-manager-component-url-preview event', async () => {
    const spy = sinon.spy();
    const mode = 'preview';
    const url = 'https://info.adif.es/';
    el.previewParams = formUserData2;
    el._screenType = 'preview';

    await el.updateComplete;

    el.addEventListener('trainboard-app-manager-component-url-preview', spy);
    el._dispatchIframeUrlChange(mode, url);

    assert.isTrue(spy.calledOnce);
    
    const event = spy.firstCall.args[0];
    assert.strictEqual(event.detail, url);
    assert.isTrue(event.bubbles);
    assert.isTrue(event.composed);
  });

  it('It should dispatch trainboard-app-manager-component-url-home event', async () => {
    const spy = sinon.spy();
    const mode = 'home';
    const url = 'https://info.adif.es/';
    el.screnParams = formUserData2;
    el._screenType = 'home';

    await el.updateComplete;

    el.addEventListener('trainboard-app-manager-component-url-home', spy);
    el._dispatchIframeUrlChange(mode, url);

    assert.isTrue(spy.calledOnce);
    
    const event = spy.firstCall.args[0];
    assert.strictEqual(event.detail, url);
    assert.isTrue(event.bubbles);
  });
});
