export default class SettingsController {
  /*@ngInject*/

  constructor($rootScope, $cookies, sim) {
    // function to call to change the language in use
    this.use = () => $cookies.put('lang', $rootScope.selectedLang = this.lang);

    // get settings values
    this.pc_step = sim.pc.step;
    this.tVarCount = sim.tVarCount;
    this.simLabels = $rootScope.simLabels = (($cookies.get('simLabels') || 'true') === 'true')
    this.logStats = $rootScope.logStats = (($cookies.get('logStats') || 'true') === 'true')
    this.welcomeMsg = (($cookies.get('welcomeMsg') || 'true') === 'true')

    // startup with cookie language or browser lang or default lang
    this.lang = $cookies.get('lang')
                  || navigator.language.split('-')[0]
                  || navigator.userLanguage.split('-')[0];
    this.use();

    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
  }

  // function called on 'APPLY' button mouse click in the settings panel
  save() {
    // language preference
    this.use();

    // save cookies
    this.$cookies.put('pc_step', this.pc_step);
    this.$cookies.put('tVarCount', this.tVarCount);
    this.$cookies.put('welcomeMsg', this.welcomeMsg);
    this.$cookies.put('simLabels', (this.$rootScope.simLabels = this.simLabels));
    this.$cookies.put('logStats', (this.$rootScope.logStats = this.logStats));

    // close settings panel
    this.$rootScope.panel = '';
  }
}
