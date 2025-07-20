const translations = {
  es: { 
    "trainboard-app-main-header-title": "Trainboard",
    "trainboard-app-main-header-subtitle": "Trenes en directo",
    "trainboard-app-main-disclaimer-label": "Aviso importante: ",
    "trainboard-app-main-disclaimer-text": "Esta herramienta es independiente y no tiene ninguna relación oficial con Adif. Su único propósito es facilitar a los usuarios la consulta de la información mostrada en los paneles de las estaciones gestionadas por Adif.",
    "trainboard-app-form-label-station": "Estación",
    "trainboard-app-form-label-language": "Idiomas",
    "trainboard-app-form-label-screen": "Pantalla",
    "trainboard-app-form-label-category": "Categoría",
    "trainboard-app-form-label-companies": "Compañías",
    "trainboard-app-form-label-subtitles": "Subtítulos",
    "trainboard-app-form-label-font-size": "Tamaño de texto",
    "trainboard-app-main-logo-white-alt": "Logotipo de Trainboard en color blanco",
    "trainboard-app-main-language-es": "🇪🇸",
    "trainboard-app-main-language-en": "EN",
    "trainboard-app-panel-button-config": "Configurar panel",
    "trainboard-app-form-title": "Configuración del panel",
    "trainboard-app-form-subtitle": "Introduce los parámetros de la estación",
  },
  en: { 
    "trainboard-app-main-header-title": "Trainboard",
    "trainboard-app-main-header-subtitle": "On live trains",
    "trainboard-app-panel-button-config": "Setup panel",
  }
};

let currentLang = 'es';

export function t(key) {
  return translations[currentLang][key] || key;
}

export function setLang(lang) {
  currentLang = lang;
}