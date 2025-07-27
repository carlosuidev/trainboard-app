import { html, fixture } from '@open-wc/testing';
import '../src/views/trainboard-app-main-view.js';
import { TrainboardAppMainView } from '../src/views/trainboard-app-main-view.js';
import { formSubmitData, servicesData, languagesData, stationsData } from '../test/mocks.js';
import { t } from '../locales/locales.js';
import { assert } from 'chai';

describe('<trainboard-app-main-view>', () => {
  let el;
  let url = 'http://localhost:8000/';

  beforeEach(async () => {
    el = await fixture(html`<trainboard-app-main-view></trainboard-app-main-view>`);
  });

  it('It renders correctly', () => {
    assert.exists(el);
  });

  it('It has shadow DOM', () => {
    assert.exists(el.shadowRoot);
  });

  it('It should return component name', () => {
    assert.deepEqual(TrainboardAppMainView.is, 'trainboard-app-main-view');
  });

  it('It should open form modal', async () => {
    el._openModal();
    await el.updateComplete;
    const formComponent = el.shadowRoot.querySelector('trainboard-app-form-component');
    assert.exists(formComponent);
  });

  it('It should close form modal', async () => {
    el._closeModal();
    await el.updateComplete;
    const formComponent = el.shadowRoot.querySelector('trainboard-app-form-component');
    assert.notExists(formComponent);
  });

  it('It should render main view with components when form is close', async () => {
    el.toggles = { form: false };
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
    await el.updateComplete;

    const formComponent = el.shadowRoot.querySelector('trainboard-app-form-component');
    const managerComponent = el.shadowRoot.querySelector('trainboard-app-manager-component');
    const panelComponent = el.shadowRoot.querySelector('trainboard-app-panel-component');

    assert.notExists(formComponent);
    assert.exists(managerComponent);
    assert.exists(panelComponent);
  });

  it('It should render main view with components when form is open', async () => {
    el.toggles = { form: true };
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
    await el.updateComplete;

    const formComponent = el.shadowRoot.querySelector('trainboard-app-form-component');
    const managerComponent = el.shadowRoot.querySelector('trainboard-app-manager-component');
    const panelComponent = el.shadowRoot.querySelector('trainboard-app-panel-component');

    assert.exists(formComponent);
    assert.exists(managerComponent);
    assert.exists(panelComponent);
  });

  it('It should render header template', async () => {
    el.toggles = { form: false };
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
    await el.updateComplete;

    const header = el.shadowRoot.querySelector('#header');
    const img = header.querySelector('.header-container .left-side img');
    const h1 = el.shadowRoot.querySelector('.left-side .app-description h1');
    const h2 = el.shadowRoot.querySelector('.left-side .app-description h2');
    const github = el.shadowRoot.querySelector('.header-container .right-side a');
    const githubLogo = el.shadowRoot.querySelector('.header-container .right-side a img');

    assert.exists(header);
    assert.deepEqual(img.src, `${url}trainboard_logo.svg`);
    assert.deepEqual(img.alt, t('trainboard-app-main-logo-white-alt'));
    assert.deepEqual(h1.textContent, t('trainboard-app-main-header-title'));
    assert.deepEqual(h2.textContent, t('trainboard-app-main-header-subtitle'));
    assert.deepEqual(github.href, 'https://github.com/carlosuidev/trainboard-app');
    assert.deepEqual(githubLogo.src, `${url}github_icon.svg`);
  });

  it('It should render disclaimer template', async () => {
    el.toggles = { form: false };
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
    await el.updateComplete;

    const disclaimer = el.shadowRoot.querySelector('#disclaimer');
    const p = el.shadowRoot.querySelectorAll('#disclaimer p');

    assert.exists(disclaimer);
    assert.exists(p[0]);
  });

  it('It should render footer template', async () => {
    el.toggles = { form: false };
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
    await el.updateComplete;

    const footer = el.shadowRoot.querySelector('#footer .footer-section');
    const p = footer.querySelector('p');
    const a = footer.querySelector('a');

    assert.exists(footer);
    assert.deepEqual(p.textContent, t('trainboard-app-main-footer-text'));
    assert.deepEqual(a.href, 'https://github.com/carlosuidev/trainboard-app');
    assert.deepEqual(a.textContent, t('trainboard-app-main-footer-link'));
  });

  it('It should update screenParams and close form modal on _handleFormSubmit', async () => {
    el.toggles = { form: true };
    const mockFormData = formSubmitData;
    const event = { detail: { formData: mockFormData } };
    el._handleFormSubmit(event);
    await el.updateComplete;

    assert.deepEqual(el.screenParams, mockFormData);
    assert.isFalse(el.toggles.form);
  });

  it('It should not throw submit if event is missing detail', async () => {
    el.toggles = { form: true };
    await el.updateComplete;

    assert.doesNotThrow(() => el._handleFormSubmit({}));
  });

  it('It should not throw submit if event is missing form data', async () => {
    el.toggles = { form: true };
    await el.updateComplete;

    assert.doesNotThrow(() => el._handleFormSubmit({ detail: {} }));
  });
});
