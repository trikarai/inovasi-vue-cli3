import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locale/en.json'
// import id from './locale/id.json'
// import ja from './locale/ja.json'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
    en
}

const i18n = new VueI18n({
    locale : locale,
    messages : messages
})

export default i18n;