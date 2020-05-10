import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
//for db
import AlbumAPIService from '@/services/AlbumServices'




Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//for db
Vue.prototype.$album_api = AlbumAPIService


new Vue({
  render: h => h(App),
}).$mount('#app')
