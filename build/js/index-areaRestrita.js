'use strict';

// exemplo para integra vueJS without webpack
// https://github.com/kafkaca/vue-without-webpack/tree/master/js

var HomeAreaRestrita = httpVueLoader('./js/components/area-restrita/home.vue');

var ambiente = {
  'localhost': "http://localhost:5000",
  'aquiculturanaamazonia.com.br':  'http://api.aquiculturanaamazonia.com.br',
  'www.aquiculturanaamazonia.com.br': 'http://api.aquiculturanaamazonia.com.br'
}

console.log(ambiente[location.hostname]);
axios.defaults.baseURL = ambiente[location.hostname];
console.log('axios', axios.defaults.baseURL);

/* Router and App setup: */
var routes = [{
  path: '/home',
  name: 'homeAreaRestrita',
  component: HomeAreaRestrita
},
{path: '*', redirect: '/home'}];

var router = new VueRouter({
  routes: routes
});


var app = new Vue({
  router: router
}).$mount('#app');