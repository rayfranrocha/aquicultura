<template>
    <div>
        <div class="container">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Minhas Compras realizadas</h1>
            <hr class="small">
            <div class="card-body text-center">
                <p v-if="listInscricao.length === 0">Ainda não há itens comprados</p>

                <div v-else class="container">
                    <div class="row">
                        <div class="col-sm-12"
                            v-for="inscricaoEvento in listInscricao"
                            :key="inscricaoEvento._id">
                            <div class="card border-info">
                                <h6 class="card-title u-margin-top-small">Produtos Adiquiridos nessa inscrição</h6>
                                <hr class="small">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Descriçao</th>
                                                        <th>Valor (R$)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="(inscricaoEvento.tipoInscricao && inscricaoEvento.tipoInscricao !== 'MINI_CURSO') || inscricaoEvento.tipoInscricaoObj">
                                                        <td class="text-left">Inscrição no evento como: {{inscricaoEvento.tipoInscricao || inscricaoEvento.tipoInscricaoObj.nome}}</td>
                                                        <td>{{getPrecoInscricao(inscricaoEvento)}}</td>
                                                    </tr>
                                                    <tr v-if="inscricaoEvento.minicurso">
                                                        <td class="text-left">Inscrição no minicurso 1: {{inscricaoEvento.minicurso.nome}}</td>
                                                        <td>{{formataMoney(inscricaoEvento.minicurso.preco)}}</td>
                                                    </tr>
                                                    <tr v-if="inscricaoEvento.minicurso2">
                                                        <td class="text-left">Inscrição no minicurso 2: {{inscricaoEvento.minicurso2.nome}}</td>
                                                        <td>{{formataMoney(inscricaoEvento.minicurso2.preco)}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td class="text-right font-weight-bold">Total (R$):</td>
                                                        <td class="font-weight-bold">{{formataMoney(inscricaoEvento.totalAPagar)}}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <small v-if="podeGerarBoleto(inscricaoEvento)">
                                            <b>Atenção:</b> Se você ainda não realizou o pagamento dessa inscrição e o boleto estiver vencido, exclua-a e faça uma nova.
                                        </small>
                                    </div>
                                </div>
                                <div class="card-footer text-left">
                                    <div class="float-sm-left">
                                        <label for="pagamentoEvento">Status: <b>{{getStatusPagamento(inscricaoEvento)}}</b></label>
                                    </div>
                                    <div class="float-sm-right">
                                        <button v-if="podeExcluir(inscricaoEvento)" @click="remover(inscricaoEvento._id)" class="btn btn-danger">
                                            <i class="fa fa-trash"></i>
                                            Excluir inscrição
                                        </button>
                                        <a v-if="podeGerarBoleto(inscricaoEvento)" :href="linkBoleto(inscricaoEvento)" class="btn btn-primary"
                                            target="_blank">
                                            <i class="fa fa-file-pdf"></i>
                                            Imprimir Boleto
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="container" v-if="!inscricaoEvento || !inscricaoMinicurso || !inscricaoMinicurso2">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Produtos Disponíveis</h1>
            <hr class="small">
            <div class="card-body text-center">
                <div class="container">
                    <div class="row">
                        <div class="col" v-if="!inscricaoEvento">
                            <a class="btn btn-lg btn-primary"
                                href="/inscricao.html#/home/inscricao">
                                <i class="fas fa-address-card"></i>
                                Inscrição no Evento
                            </a>
                        </div>
                        <div class="col" v-if="isMinicursoDisponivel">
                            <a class="btn btn-lg btn-primary"
                                href="/inscricao.html#/home/minicurso">
                                <i class="fas fa-chalkboard-teacher"></i>
                                Inscrição no Minicurso
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
                    <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">TRABALHOS</h1>
            
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
                return this.inscricaoEvento && (!this.inscricaoMinicurso || !this.inscricaoMinicurso2)
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
            this.loadInscricao();
        },
        methods: {
            loadInscricao() {
                axios.get(`/inscricao?user=${this.idUser}`)
                    .then(response => {
                        this.listInscricao = response.data;
                        this.inscricaoEvento = this.listInscricao.find(inscricao => inscricao.tipoInscricao || inscricao.tipoInscricaoObj);
                        this.inscricaoMinicurso = this.listInscricao.find(inscricao => inscricao.minicurso);
                        this.inscricaoMinicurso2 = this.listInscricao.find(inscricao => inscricao.minicurso2);

                        if (this.inscricaoEvento) {
                            if (this.inscricaoEvento.tipoInscricao === 'MINI_CURSO') {
                                this.inscricaoEvento = null;
                            }
                        }
                    });
            },
            formataMoney (valor) {
                if (!valor) return '';
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            },
            getStatusPagamento(inscricao) {
                if (!inscricao) {
                    return ''
                }

                if (!inscricao.statusPagseguro) {
                    return 'FORMA DE PAGAMENTO NÃO DETECTADA (exclua essa inscrição e faça novamente)'
                }

                if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '3' || inscricao.statusPagseguro.transaction.status[0] === '4') {
                    return 'PAGAMENTO CONFIRMADO'
                }

                if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '1') {
                    return 'AGUARDANDO PAGAMENTO'
                }

                if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '2') {
                    return 'EM ANÁLISE PELO PAGSEGURO'
                }

                if (!inscricao.pagseguro || !inscricao.statusPagseguro) {
                    return 'FORMA DE PAGAMENTO NÃO DETECTADA (exclua essa inscrição e faça novamente)'
                }
            },

            getPrecoInscricao (inscricao) {
                if (inscricao.tipoInscricaoObj) {
                    var dataBase = new Date();
                    dataBase.setDate(21);
                    dataBase.setMonth(8);

                    var dataAtual = new Date();
                    if (dataAtual < dataBase) {
                        return this.formataMoney(inscricao.tipoInscricaoObj.precoAte21);
                    } else {
                        return this.formataMoney(inscricao.tipoInscricaoObj.precoApos21);
                    }
                    
                } else {
                    return this.formataMoney(inscricao.valorInscricao);
                }
            },

            remover(idInscricao) {
                if (confirm('Deseja relmente Excluir essa Inscrição?')) {
                    axios.delete(`/inscricao/${idInscricao}`)
                        .then(() => this.loadInscricao());
                }
            },

            podeExcluir (inscricao) {
                return !inscricao.pagseguro || !inscricao.statusPagseguro 
                        || inscricao.statusPagseguro.transaction.status[0] === '1';
            },

            podeGerarBoleto (inscricao) {
                return (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction
                    && inscricao.statusPagseguro.transaction.paymentMethod[0].code[0] === '202'
                    && inscricao.statusPagseguro.transaction.status[0] === '1');
            },

            linkBoleto (inscricao) {
                return this.podeGerarBoleto(inscricao) ?
                    inscricao.statusPagseguro.transaction.paymentLink[0]: '#'
            }
        }
    }
</script>
