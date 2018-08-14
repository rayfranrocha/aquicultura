'use strict';

// exemplo para integra vueJS without webpack
// https://github.com/kafkaca/vue-without-webpack/tree/master/js

var HomeInscricao = httpVueLoader('./js/components/inscricao/home.vue');

/* Router and App setup: */
var routes = [{
  path: '/home',
  name: 'homeInscricao',
  component: HomeInscricao
},
{path: '*', redirect: '/home'}];

var router = new VueRouter({
  routes: routes
});

var app = new Vue({
  router: router
}).$mount('#app');