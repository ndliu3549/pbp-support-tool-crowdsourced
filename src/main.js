import Vue from 'vue'
import router from './router';
import App from './App'
import VueResource from 'vue-resource'


import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

Vue.use(VueResource)
new Vue({
	el: '#app',
	components: {
		App
	},
	template: '<App/>',
	router,
})