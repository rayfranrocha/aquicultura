<template>
    <div>
        <div class="card">
          <div class="card-body">
                <div class="row">
                    <div class="col align-self-start">
                        <b>Olá, {{user.name}}</b>
                    </div>
                    <div class="col col-md-1 align-self-end">
                        <button type="button" class="btn btn-secondary" onclick="logout()">
                            <span class="oi oi-account-logout"></span>
                            Sair
                        </button>
                    </div>
                </div>
                <div class="container dados_container">
                    <produtos></produtos>
                </div>
                <!-- <div class="container">
                    <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">SELECIONE UMA DAS OPÇÕES ABAIXO</h1>
                    <div v-if="!inscricao" style="padding: 0 3rem;" class=" u-margin-top-small ">
                        <a href="./inscricao.html">
                            <button class="bt-flat-azul">Inscrições</button>
                        </a>
                    </div>
                    <div style="padding: 0 3rem;" class="u-margin-top-small">
                        <a href="trabalhos.html#/list-trabalho">
                            <button class="bt-flat-azul">Trabalhos Submetidos</button>
                        </a>
                    </div>
                    <div style="padding: 0 3rem;" class="u-margin-top-small">
                            <a href="trabalhos.html#/trabalho">
                                <button class="bt-flat-azul">Submeter Trabalhos</button>
                            </a>
                    </div>
                </div> -->
          </div>
        </div>
        
        
        <div class="card container" v-if="user.admin">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">MENU ADMINISTRADOR</h1>
            <div style="padding: 0 3rem;" class="u-margin-top-small">
                <router-link class="btn btn-warning btn-lg btn-block"
                    :to="{name: 'AprovacaoTrabalhos'}">
                    Aprovar Trabalhos Submetidos
                </router-link>
            </div>
            <div style="padding: 0 3rem; margin-bottom: 32px;" class="u-margin-top-small">
                <router-link class="btn btn-warning btn-lg btn-block"
                    :to="{name: 'ListInscricoes'}">
                   Inscrições Realizadas
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
var produtos = httpVueLoader("/js/components/inscricao/produtos.vue");
module.exports = {
  components: {
    produtos
  },
  computed: {
    user() {
      return JSON.parse(
        decodeURIComponent(
          escape(
            window.atob(window.localStorage.getItem("auth-token").split(".")[1])
          )
        )
      );
    },
    statusPagamento() {
      if (!this.inscricao) {
        return "";
      }

      if (
        this.inscricao.statusPagseguro &&
        (this.inscricao.statusPagseguro.transaction.status[0] === "3"
          || this.inscricao.statusPagseguro.transaction.status[0] === "4")
      ) {
        return "PAGAMENTO CONFIRMADO";
      }

      if (
        this.inscricao.statusPagseguro &&
        this.inscricao.statusPagseguro.transaction.status[0] === "1"
      ) {
        return "AGUARDANDO PAGAMENTO";
      }

      if (
        this.inscricao.statusPagseguro &&
        this.inscricao.statusPagseguro.transaction.status[0] === "6"
      ) {
        return "PAGAMENTO CANCELADO/DEVOLVIDO PELO PAGSEGURO";
      }

      if (
        this.inscricao.statusPagseguro &&
        this.inscricao.statusPagseguro.transaction.status[0] === "2"
      ) {
        return "EM ANÁLISE PELO PAGSEGURO";
      }

      if (this.inscricao.pagseguro) {
        return "PROCESSANDO PAGAMENTO";
      }
    },
    minicurso() {
      if (this.inscricao.minicurso) {
        return this.inscricao.minicurso.nome;
      }
    }
  },
  data() {
    return {
      inscricao: null
    };
  },

  created() {
    axios.get(`/inscricao?user__equals=${this.user.id}`).then(response => {
      if (response.data && response.data.length > 0) {
        this.inscricao = response.data[0];
      }
    });
  },

  methods: {
    formataMoney(valor) {
      if (!valor) return "";
      return `R$ ${valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
  }
};
</script>

