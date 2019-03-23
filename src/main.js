import Vue from 'vue'
import App from './App.vue'
import MonthPicker from './lib'
import 'reset-css'

Vue.config.productionTip = false

Vue.use(MonthPicker)

new Vue({
  render: h => h(App),
}).$mount('#app')
