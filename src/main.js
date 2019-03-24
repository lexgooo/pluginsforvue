import Vue from 'vue'
import App from './App.vue'
import {MonthPicker, Tree} from './index'

import 'reset-css'

Vue.config.productionTip = false

Vue.use(MonthPicker)
Vue.use(Tree)

new Vue({
  render: h => h(App),
}).$mount('#app')
