// languages files
import { default as translations } from './locales';

export default function($rootScope) {
  // languages
  $rootScope.translations = translations;
  $rootScope.selectedLang = 'en';

  // function to translate a string
  $rootScope.translate = function(t) {
    return $rootScope.translations[$rootScope.selectedLang].text[t];
  };

  // warning on page leave
  window.addEventListener('beforeunload', function(e) {
    return (e || window.event).returnValue = translate('WARNING_UNSAVED');
  });
}
