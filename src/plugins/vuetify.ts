import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { ru } from 'vuetify/locale'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  locale: {
    locale: 'ru',
    messages: { ru },
  },

})
