import { html, fixture } from '@open-wc/testing';
import '../src/web-components/trainboard-app-form-component.js';
import { TrainboardAppFormComponent } from '../src/web-components/trainboard-app-form-component.js';
import { servicesData, languagesData, stationsData } from '../src/data/constants.js';
import { t } from '../locales/locales.js';
import { assert } from 'chai';
import sinon from 'sinon';


describe('<trainboard-app-form-component>', () => {
  let el;
  let url = 'http://localhost:8000/';

  beforeEach(async () => {
    el = await fixture(html`<trainboard-app-form-component></trainboard-app-form-component>`);
    el.servicesData = servicesData;
    el.languagesData = languagesData;
    el.stationsData = stationsData;
  });

  it('It renders correctly', () => {
    assert.exists(el);
  });

  it('It has shadow DOM', () => {
    assert.exists(el.shadowRoot);
  });

  it('It should return component name', () => {
    assert.deepEqual(TrainboardAppFormComponent.is, 'trainboard-app-form-component');
  });

  it('It should render header', () => {
    const formTitle = el.shadowRoot.querySelector('#form-modal .form-header .form-title');
    const h2 = formTitle.querySelector('h2');
    const formSubtitle = formTitle.querySelector('p');
    const closeButton = el.shadowRoot.querySelector('#form-modal .form-header button');

    assert.exists(formTitle);
    assert.deepEqual(h2.textContent, t('trainboard-app-form-title'));
    assert.deepEqual(formSubtitle.textContent, t('trainboard-app-form-subtitle'));
    assert.exists(closeButton);
  });

  it('It should save settings on submit', async () => {
    el._formData = {
      station: '60000',
      screen: 'arrivals',
      language: 'CAT',
      services: ['C', 'L'],
    };
    await el.updateComplete;

    const spy = sinon.spy();
    el.addEventListener('trainboard-app-form-component-submit', spy);
    el._submitForm();

    assert.isTrue(spy.calledOnce);
    const event = spy.firstCall.args[0];
    assert.deepEqual(event.detail.formData, el._formData);
  });

  it('It should close modal on close button click', () => {
    const spy = sinon.spy();
    el.addEventListener('trainboard-app-form-component-close-modal', spy);

    const closeButton = el.shadowRoot.querySelector('#close-modal-btn');
    closeButton.click();

    assert.isTrue(spy.calledOnce);
  });

  it('It should reset form data', async () => {
      el._formData = {
      station: '1234',
      screen: 'departures',
      language: 'ENG',
      services: ['L', 'R'],
    };
    el._requiredFieldStatus = {
      station: true,
      screen: true,
      services: true,
      language: true
    };
    await el.updateComplete;

    const resetButton = el.shadowRoot.querySelector('#btn-reset');
    resetButton.click();

    await el.updateComplete;
    assert.deepEqual(el._formData, {
      station: '',
      screen: '',
      language: '',
      services: [],
    });
    assert.deepEqual(el._requiredFieldStatus, {
      station: false,
      screen: false,
      services: false,
      language: false
    });
    assert.deepEqual(el.customUrl, 'https://info.adif.es/?s=0');
  });

  it('It should update station', () => {
    assert.strictEqual(el._formData.station, '');
    el._updateForm('station', '1234');
    assert.strictEqual(el._formData.station, '1234');
  });

  it('It should update screen with departures', () => {
    assert.strictEqual(el._formData.screen, '');
    el._updateForm('screen', 'departures');
    assert.strictEqual(el._formData.screen, 'departures');
  });

  it('It should update screen with arrivals', () => {
    assert.strictEqual(el._formData.screen, '');
    el._updateForm('screen', 'arrivals');
    assert.strictEqual(el._formData.screen, 'arrivals');
  });

  it('It should update services', () => {
    assert.deepStrictEqual(el._formData.services, []);

    el._updateFormArray('services', 'L');
    assert.deepStrictEqual(el._formData.services, ['L']);

    el._updateFormArray('services', 'R');
    assert.deepStrictEqual(el._formData.services, ['L', 'R']);

    el._updateFormArray('services', 'L');
    assert.deepStrictEqual(el._formData.services, ['R']);
  });

  it('It should update language', () => {
    assert.strictEqual(el._formData.language, '');
    el._updateForm('language', 'ESP');
    assert.strictEqual(el._formData.language, 'ESP');
  });

  it('It should dispatch preview event when form data changes', async () => {
    const spy = sinon.spy();
    el.addEventListener('trainboard-app-form-component-preview', spy);

    el._updateForm('station', '12345');
    await el.updateComplete;

    assert.isTrue(spy.calledOnce);

    const event = spy.firstCall.args[0];
    assert.deepEqual(event.detail.formData, el._formData);
    assert.isTrue(event.bubbles);
    assert.isTrue(event.composed);
  });

  it('It should render station section with input and datalist', () => {
    const stationSection = el.shadowRoot.querySelector('.station-section');
    assert.exists(stationSection, 'Station section should exist');

    const label = stationSection.querySelector('label');
    assert.strictEqual(label.textContent, t('trainboard-app-form-label-station'));

    const small = stationSection.querySelector('small');
    assert.strictEqual(small.textContent, t('trainboard-app-form-info-label-station'));

    const input = stationSection.querySelector('input#station');
    assert.strictEqual(input.getAttribute('placeholder'), t('trainboard-app-form-placeholder-station'));

    const datalist = stationSection.querySelector('datalist#stations');
    assert.isAbove(datalist.children.length, 0, 'Datalist should have options');
    
    Array.from(datalist.children).forEach((option, idx) => {
      assert.strictEqual(option.value, el.stationsData[idx].description);
      assert.strictEqual(option.getAttribute('data-code'), el.stationsData[idx].code);
    });
  });

  it('It should update station when a valid station is selected', async () => {
    const stationSection = el.shadowRoot.querySelector('.station-section');
    const input = stationSection.querySelector('input#station');
    const stationToSelect = el.stationsData[0];

    input.value = stationToSelect.description;
    input.dispatchEvent(new Event('change'));

    await el.updateComplete;

    assert.strictEqual(el._formData.station, stationToSelect.code);
  });

  it('It should clear station when an invalid station is entered', async () => {
    el._formData.station = '1234';
    await el.updateComplete;

    const stationSection = el.shadowRoot.querySelector('.station-section');
    const input = stationSection.querySelector('input#station');

    input.value = 'XXXX';
    input.dispatchEvent(new Event('change'));

    await el.updateComplete;

    assert.strictEqual(el._formData.station, '');
  });

  it('It should render screen type section', () => {
    const screenSection = el.shadowRoot.querySelector('.screen-preview-container');
    assert.exists(screenSection);
    const iframe = screenSection.querySelector('iframe');
    assert.deepEqual(iframe.src, el.customUrl);
  });
});
