import Vue from 'vue'
import router from './router'
import * as ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
import App from './App.vue'

Vue.use(ElementUI)

String.prototype.replaceAll = function (FindText, RepText) {
  let regExp = new RegExp(FindText, "g");
  return this.replace(regExp, RepText);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
