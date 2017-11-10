import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import 'vue-material/dist/vue-material.css'

ADL.XAPIWrapper.changeConfig({
  "endpoint": process.env.XAPI_ENDPOINT,
  "user": process.env.XAPI_USER,
  "password": process.env.XAPI_PASSWORD,
  "strictCallbacks": true
});

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.material.registerTheme({
  default: {
    primary: 'red',
    accent: 'blue'
  },
  dark: {
    primary: 'black',
    accent: 'white'
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
