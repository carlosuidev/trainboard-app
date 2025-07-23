const translations = {
  es: { 
    "trainboard-app-main-header-title": "Trainboard",
    "trainboard-app-main-header-subtitle": "Trenes en directo",
    "trainboard-app-main-disclaimer-label": "Aviso importante: ",
    "trainboard-app-main-disclaimer-text": "Esta herramienta es independiente y no tiene ninguna relación oficial con Adif. Su único propósito es facilitar a los usuarios la consulta de la información mostrada en los paneles de las estaciones gestionadas por Adif.",
    "trainboard-app-form-label-station": "Estación",
    "trainboard-app-form-placeholder-station": "Escribe para buscar...",
    "trainboard-app-form-placeholder-language": "Selecciona un idioma",
    "trainboard-app-form-info-label-station": "Escribe para buscar...",
    "trainboard-app-form-info-label-station": "Selecciona la estación que quieres visualizar",
    "trainboard-app-form-label-language": "Idiomas",
    "trainboard-app-form-info-label-language": "Selecciona el idioma que quieres utilizar",
    "trainboard-app-form-label-screen": "Pantalla",
    "trainboard-app-form-info-label-screen": "¿Qué prefieres que se visualice?",
    "trainboard-app-form-label-companies": "Compañías",
    "trainboard-app-form-label-services": "Servicios",
    "trainboard-app-form-info-label-services": "¿Qué tipos de trenes quieres ver?",
    "trainboard-app-form-label-companies": "Compañías",
    "trainboard-app-form-label-font-size": "Tamaño de texto",
    "trainboard-app-main-logo-white-alt": "Logotipo de Trainboard en color blanco",
    "trainboard-app-main-language-es": "ES",
    "trainboard-app-main-language-en": "EN",
    "trainboard-app-panel-button-config": "Configurar panel",
    "trainboard-app-form-title": "Configuración del panel",
    "trainboard-app-form-subtitle": "Introduce los parámetros de la estación",
    "trainboard-app-form-value-screen-departures": "Salidas",
    "trainboard-app-form-value-screen-arrivals": "Llegadas",
    "trainboard-app-form-services-options-cercanias": "Cercanías",
    "trainboard-app-form-services-options-long-distance": "Larga distancia",
    "trainboard-app-form-services-options-regional": "Regional",
    "trainboard-app-form-services-options-high-speed": "Alta velocidad",
    "trainboard-app-form-error-required-message": "Este campo es obligatorio",
    "trainboard-app-form-button-submit": "Guardar configuración",
    "trainboard-app-form-button-reset": "Reiniciar configuración",
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