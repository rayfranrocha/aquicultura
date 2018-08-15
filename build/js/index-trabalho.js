'use strict';

// exemplo para integra vueJS without webpack
// https://github.com/kafkaca/vue-without-webpack/tree/master/js

var FormTrabalho = httpVueLoader('./js/components/trabalho/form.vue');
var ListTrabalho = httpVueLoader('./js/components/trabalho/meusTrabalhos.vue');

var ambiente = {
  'localhost': "http://localhost:5000",
  'aquiculturanaamazonia.com.br':  'http://api.aquiculturanaamazonia.com.br',
  'www.aquiculturanaamazonia.com.br': 'http://api.aquiculturanaamazonia.com.br'
}

console.log(ambiente[location.hostname]);
axios.defaults.baseURL = ambiente[location.hostname];
console.log('axios', axios.defaults.baseURL);

/* Router and App setup: */
var routes = [
  {
  path: '/trabalho',
  name: 'homeTrabalho',
  component: FormTrabalho
},
{
  path: '/list-trabalho',
  name: 'listTrabalho',
  component: ListTrabalho
},
{path: '*', redirect: '/trabalho'}];

var router = new VueRouter({
  routes: routes
});


var app = new Vue({
  router: router
}).$mount('#app');