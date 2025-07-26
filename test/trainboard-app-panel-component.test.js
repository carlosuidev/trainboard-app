import { html, fixture } from '@open-wc/testing';
import '../src/web-components/trainboard-app-panel-component.js';
import { TrainboardAppPanelComponent } from '../src/web-components/trainboard-app-panel-component.js';
import { formUserData1, formSubmitData, servicesData, languagesData, stationsData } from './mocks.js';
import { t } from '../locales/locales.js';
import { assert } from 'chai';

describe('<trainboard-app-panel-component>', () => {
  let el;
  let url = 'http://localhost:8000/';

  beforeEach(async () => {
    el = await fixture(html`<trainboard-app-panel-component></trainboard-app-panel-component>`);
  });

  it('It renders correctly', () => {
    assert.exists(el);
  });

  it('It has shadow DOM', () => {
    assert.exists(el.shadowRoot);
  });

  it('It should return component name', () => {
    assert.deepEqual(TrainboardAppPanelComponent.is, 'trainboard-app-panel-component');
  });

  it('It should render header template', async () =>{
    el.screenParams = formUserData1;
    el.customUrl = 'https://info.adif.es/?s=60000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D60000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DL%2CR%2CA%2CC%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dfalse%26font-size%3D1%23'
    await el.updateComplete;

    const header = el.shadowRoot.querySelector('#screen-header');
    const screenContent = header.querySelector('.screen-content');
    const textScreenContent = screenContent.querySelector('p');

    const stationLabel = header.querySelector('.station-content .label');
    const stationDesc = header.querySelector('.station-content .description');
    
    const servicesLabel = header.querySelector('.services-content .label');
    const servicesDesc = header.querySelector('.services-content .description');
    
    const languageLabel = header.querySelector('.language-content .label');
    const languageDesc = header.querySelector('.language-content .description');

    assert.exists(header);
    assert.deepEqual(textScreenContent.textContent, t('trainboard-app-form-value-screen-departures'));
    
    assert.deepEqual(stationLabel.textContent, t('trainboard-app-panel-label-station'));
    assert.deepEqual(stationDesc.textContent, 'MADRID PTA. ATOCHA - ALMUDENA GRANDES');
    
    assert.deepEqual(servicesLabel.textContent, t('trainboard-app-panel-label-services'));
    assert.deepEqual(servicesDesc.textContent, 'Cercanías, Larga distancia, Regional, Alta velocidad');
    
    assert.deepEqual(languageLabel.textContent, t('trainboard-app-panel-label-language'));
    assert.deepEqual(languageDesc.textContent, 'Español');
  });

  it('It should render iframe template', async () =>{
    el.screenParams = formUserData1;
    el.customUrl = 'https://info.adif.es/?s=60000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D60000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DL%2CR%2CA%2CC%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dfalse%26font-size%3D1%23'
    await el.updateComplete;

    const iframe = el.shadowRoot.querySelector('.screen-container iframe');
    assert.exists(iframe);
    assert.deepEqual(iframe.src, el.customUrl);
  });

  it('It should render external link template', async () =>{
    el.screenParams = formUserData1;
    el.customUrl = 'https://info.adif.es/?s=60000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D60000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DL%2CR%2CA%2CC%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dfalse%26font-size%3D1%23'
    await el.updateComplete;

    const externalContainer = el.shadowRoot.querySelector('.screen-container .external-container');
    const box = externalContainer.querySelector('.copy-box p');
    const link = externalContainer.querySelector('a');
    const icon = link.querySelector('img');

    assert.exists(externalContainer);
    assert.deepEqual(box.textContent, 'https://info.adif.es/?s=60000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D60000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DL%2CR%2CA%2CC%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dtrue%26font-size%3D1%23');
    assert.deepEqual(link.href, 'https://info.adif.es/?s=60000&a=a%26rutaRecursos%3D..%2F..%2F..%2Frecursos%26IdEstacion%3D60000%26languages%3DESP%26interfaz%3Dadif-gravita-departures%26traffic%3DL%2CR%2CA%2CC%26countdown%3Dtrue%26show-access%3Dtrue%26show-platform%3Dtrue%26show-product%3Dtrue%26show-number%3Dtrue%26show-platform-preview%3Dtrue%26show-header%3Dtrue%26font-size%3D1%23');
    assert.deepEqual(icon.src, `${url}output_icon.svg`);
  });

  it('It should use or for station when is undefined', async () => {
    el.screenParams = { station: null };
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('#screen-header');
    const stationText = header.querySelector('.station-content .description').textContent.trim();
    assert.strictEqual(stationText, '-');
  });

  it('It should use or for services when there are no services', async () => {
    el.screenParams = { services: [] };
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('#screen-header');
    const servicesText = header.querySelector('.services-content .description').textContent.trim();
    assert.strictEqual(servicesText, '-');
  });

  it('It should use or for services when there are no language of the list', async () => {
    el.screenParams = { language: 'JPN' };
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('#screen-header');
    const languageText = header.querySelector('.language-content .description').textContent.trim();
    assert.strictEqual(languageText, 'JPN');

    el._parseLanguageCode = () => undefined;
    await el.requestUpdate();
    const fallbackText = header.querySelector('.language-content .description').textContent.trim();
    assert.strictEqual(fallbackText, '-');
  });

  it('It should return translated service names when ids match', () => {
    const ids = ['C', 'L'];
    const result = el._parseServiceCodes(ids);
    assert.strictEqual(
      result,
      `${t('trainboard-app-form-services-options-cercanias')}, ${t('trainboard-app-form-services-options-long-distance')}`
    );
  });

  it('It should return the id string when service is not found', () => {
    const ids = ['Z'];
    const result = el._parseServiceCodes(ids);
    assert.strictEqual(result, 'Z');
  });

  it('It should return the language name when code matches', () => {
    const code = 'ESP';
    const result = el._parseLanguageCode(code);
    assert.strictEqual(result, 'Español');
  });

  it('It should return the code itself when language is not found', () => {
    const code = 'JPN';
    const result = el._parseLanguageCode(code);
    assert.strictEqual(result, 'JPN');
  });

  it('It should return "-" when code is false', () => {
    assert.strictEqual(el._parseLanguageCode(null), '-');
    assert.strictEqual(el._parseLanguageCode(undefined), '-');
    assert.strictEqual(el._parseLanguageCode(''), '-');
  });

  it('It should not replace last occurrence of true in adif link', () => {
    const inputUrl = 'https://adif.com/show-header=true';
    const expectedUrl = 'https://adif.com/show-header=true';
    const result = el._parseCustomUrl(inputUrl);
    assert.strictEqual(result, expectedUrl);
  });

  it('It should dispatch trainboard-app-panel-component-open-modal eventt', async () => {
    let spy = false;
    el.addEventListener('trainboard-app-panel-component-open-modal', () => { spy = true });
    el._fireOpenModal();

    await el.updateComplete;
    assert.isTrue(spy);
  });
});
