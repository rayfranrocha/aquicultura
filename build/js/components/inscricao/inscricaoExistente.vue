<template>
    <div class="card">
      <div class="card-body">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">INSCRIÇÃO EXISTENTE</h1>
      </div>
      <div class="card-body">
       <div class="alert alert-info text-center" role="alert">
           <i class="fas fa-info-circle"></i>
           <strong>Caro usuário você já possui uma inscrição em andamento!</strong>
       </div>
       <div v-if="inscricao" class="card container dados_container">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">DADOS DE SUA INSCRIÇÃO</h1>
            <ul class="lista-dados">
                <li class="dado">Nome: {{inscricao.nomeCracha}}</li>
                <li class="dado">Status: {{statusPagamento}}</li>
                <li class="dado">Tipo de Inscrição: {{inscricao.tipoInscricao}}</li>
                <li class="dado">Minicurso escolhido: {{minicurso}}</li>
                <li class="dado">Total Pago: {{formataMoney(inscricao.totalAPagar)}}</li>

            </ul>
        </div>

        <div class="text-center">
            <button @click="inscreverMinicurso" type="button" class="btn btn-success btn-lg">Realizar Inscrição em Minicurso</button>
        </div>
      </div>

    </div>
</template>
<script>
module.exports = {
    computed: {
        user () {
            return JSON.parse(decodeURIComponent(escape(window.atob( window.localStorage.getItem('auth-token').split('.')[1] ))));
        },
        statusPagamento () {
            if (!this.inscricao) {
                return ''
            }

            if (this.inscricao.statusPagseguro && this.inscricao.statusPagseguro.transaction.status[0] === '3') {
                return 'PAGAMENTO CONFIRMADO'
            }

            if (this.inscricao.statusPagseguro && this.inscricao.statusPagseguro.transaction.status[0] === '1') {
                return 'AGUARDANDO PAGAMENTO'
            }

            if (this.inscricao.statusPagseguro && this.inscricao.statusPagseguro.transaction.status[0] === '6') {
                return 'PAGAMENTO CANCELADO/DEVOLVIDO PELO PAGSEGURO'
            }

            if (this.inscricao.statusPagseguro && this.inscricao.statusPagseguro.transaction.status[0] === '2') {
                return 'EM ANÁLISE PELO PAGSEGURO'
            }

            if (this.inscricao.pagseguro) {
                return 'PROCESSANDO PAGAMENTO'
            }
        },

        minicurso () {
            if (this.inscricao.minicurso) {
                return this.inscricao.minicurso.nome
            }
        }
    },
    data () {
        return {
            inscricao: null
        }
    },
    created() {
        axios.get(`/inscricao?user__equals=${this.user.id}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    this.inscricao = response.data[0];
                }
            })
    },
    methods: {
        formataMoney (valor) {
            if (!valor) return '';
            return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
        },

        inscreverMinicurso () {
            window.localStorage.setItem('inscricao', this.inscricao._id);
            this.$router.push({name: 'minicurso'});
        }
    }
}
</script>

