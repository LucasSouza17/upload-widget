/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { tailwindColors } from './tailwindcss-colors-theme.js'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: tailwindColors,
      },
    },
  },
  defaults: {
    global: {
      style: {
        fontFamily: "'Inter', sans-serif",
      }
    },
  },
})
