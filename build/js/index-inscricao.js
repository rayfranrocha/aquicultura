'use strict';

// exemplo para integra vueJS without webpack
// https://github.com/kafkaca/vue-without-webpack/tree/master/js

var HomeInscricao = httpVueLoader('./js/components/inscricao/home.vue');
var Passo1 = httpVueLoader('./js/components/inscricao/passo1.vue');
var Passo2 = httpVueLoader('./js/components/inscricao/passo2.vue');
var Passo3 = httpVueLoader('./js/components/inscricao/passo3.vue');
var Passo4 = httpVueLoader('./js/components/inscricao/passo4.vue');

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
  name: 'homeInscricao',
  component: HomeInscricao,
  children: [
    {
      path: 'passo1',
      name: 'passo1',
      component: Passo1
    },
    {
      path: 'passo2',
      name: 'passo2',
      component: Passo2
    },
    {
      path: 'passo3',
      name: 'passo3',
      component: Passo3
    },
    {
      path: 'passo4',
      name: 'passo4',
      component: Passo4
    }
  ]
},
{path: '*', redirect: '/home/passo1'}];

var router = new VueRouter({
  routes: routes
});

var store = new Vuex.Store(
  {
    state: {
      idInscricao: 0
    },
    getters: {
      idInscricao: state => state.idInscricao
    },
    mutations: {
      setIdInscricao (state, idInscricao) {
        state.idInscricao = idInscricao;
      }
    },

    actions: {
      setIdInscricao({commit}, idInscricao) {
        commit('setIdInscricao', idInscricao);
      }
    }
  }
);

var app = new Vue({
  router: router,
  store: store
}).$mount('#app');