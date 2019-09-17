import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import customcolors from "@/components/css/customcolor"

//Translation 
import en from '@/config/lang/en';
import id from '@/config/lang/id';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { en, id },
    current: 'en'
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: customcolors.primary,
        accent: customcolors.accent,
        omikti: customcolors.omikti,
        bmikti: customcolors.bmikti
      },
      dark: {
        primary: customcolors.primary,
      },
    }
  }
});
