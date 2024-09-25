/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
// import VueJwtDecode from 'vue-jwt-decode'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    // .use(VueJwtDecode)
    .use(router)
    .use(pinia)
}
