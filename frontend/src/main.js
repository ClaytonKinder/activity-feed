import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'red',
    accent: 'blue'
  },
  dark: {
    primary: 'black',
    accent: 'grey'
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
