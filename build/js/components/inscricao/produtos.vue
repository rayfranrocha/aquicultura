<template>
    <div>
        <div class="container card">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Minhas Compras realizadas</h1>
            <hr class="small">
            <div class="card-body text-center">
                <p v-if="listInscricao.length === 0">Ainda não há itens comprados</p>

                <div class="container">
                    <div class="row">
                        <div class="col" v-if="inscricaoEvento">
                            <div class="card border-info">
                                <h6 class="card-title u-margin-top-small">Inscrição no Evento</h6>
                                <hr class="small">
                                <div class="card-body">
                                    <div class="container">
                                        <ul class="lista-dados">
                                            <li class="dado">Tipo de Inscrição: {{inscricaoEvento.tipoInscricaoObj.nome}}</li>
                                            <li class="dado">Total Pago: {{formataMoney(inscricaoEvento.totalAPagar)}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-footer text-left">
                                    <label for="pagamentoEvento">Pagamento: <b>{{getStatusPagamento(inscricaoEvento)}}</b></label>
                                </div>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6 col-xs-12" v-if="inscricaoMinicurso">
                            <div class="card border-info">
                                <h6 class="card-title">Inscrição no Minicurso 1</h6>
                                <div class="card-body">
                                    <p class="card-text">{{inscricaoMinicurso.minicurso.nome}}</p>
                                    <p class="card-text">Total Pago: {{formataMoney(inscricaoMinicurso.totalAPagar)}}</p>
                                </div>
                                <div class="card-footer text-left">
                                    <label for="pagamentoEvento">Pagamento: <b>{{getStatusPagamento(inscricaoMinicurso)}}</b></label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12" v-if="inscricaoMinicurso2">
                            <div class="card border-info">
                                <h6 class="card-title">Inscrição no Minicurso 2</h6>
                                <div class="card-body">
                                    <p class="card-text">{{inscricaoMinicurso2.minicurso2.nome}}</p>
                                    <p class="card-text">Total Pago: {{formataMoney(inscricaoMinicurso2.totalAPagar)}}</p>
                                </div>
                                <div class="card-footer text-left">
                                    <label for="pagamentoEvento">Pagamento: <b>{{getStatusPagamento(inscricaoMinicurso2)}}</b></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="container card" v-if="!inscricaoEvento || !inscricaoMinicurso || !inscricaoMinicurso2">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Produtos Disponíveis</h1>
            <hr class="small">
            <div class="card-body text-center">
                <div class="container">
                    <div class="row">
                        <div class="col" v-if="!inscricaoEvento">
                            <a class="btn btn-primary"
                                href="/inscricao.html#/home/inscricao">
                                <i class="fas fa-address-card"></i>
                                Inscrição no Evento
                            </a>
                        </div>
                        <div class="col" v-if="isMinicursoDisponivel">
                            <a class="btn btn-primary"
                                href="/inscricao.html#/home/minicurso">
                                <i class="fas fa-chalkboard-teacher"></i>
                                Inscrição no Minicurso
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        computed: {
            idUser () {
                return window.localStorage.getItem('user');
            },
            isMinicursoDisponivel () {
                return !this.inscricaoMinicurso || !this.inscricaoMinicurso2;
            }
        },
        data () {
            return {
                listInscricao: [],
                inscricaoEvento: null,
                inscricaoMinicurso: null,
                inscricaoMinicurso2: null
            }
        },
        created() {
            axios.get(`/inscricao?user=${this.idUser}`)
                .then(response => {
                    this.listInscricao = response.data;
                    this.inscricaoEvento = this.listInscricao.find(inscricao => inscricao.tipoInscricao || inscricao.tipoInscricaoObj);
                    this.inscricaoMinicurso = this.listInscricao.find(inscricao => inscricao.minicurso);
                    this.inscricaoMinicurso2 = this.listInscricao.find(inscricao => inscricao.minicurso2);
                });
        },
        methods: {
            formataMoney (valor) {
                if (!valor) return '';
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            },
            getStatusPagamento(inscricao) {
            if (!inscricao) {
                return ''
            }

            if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '3') {
                return 'PAGAMENTO CONFIRMADO'
            }

            if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '1') {
                return 'AGUARDANDO PAGAMENTO'
            }

            if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '2') {
                return 'EM ANÁLISE PELO PAGSEGURO'
            }

            if (inscricao.pagseguro) {
                return 'PROCESSANDO PAGAMENTO'
            }
        }
        }
    }
</script>
