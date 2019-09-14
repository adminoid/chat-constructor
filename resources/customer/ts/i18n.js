import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';
import Vue from 'vue';
Vue.use(VueInternationalization);
var lang = document.documentElement.lang.substr(0, 2);
// or however you determine your current app locale
export default new VueInternationalization({
    locale: lang,
    messages: Locale
});
//# sourceMappingURL=i18n.js.map