<template>
    <div>
        <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrições realizadas</h1>
                <hr class="small">

                <div class="card-body">
                    <form class="form-inline" @submit.prevent="busca">
                        <input style="width: 50%" class="form-control mr-sm-2" type="search" placeholder="Nome Usuário" aria-label="Search" v-model="filtro.nomeCracha">
                        <select v-model="filtro.statusPagamento" name="statusPagamento" id="statusPagamento" class="form-control custom-select mr-sm-2">
                            <option value="">Selecione o status...</option>
                            <option value="AGUARDANDO PAGAMENTO">Aguardando Pagamento</option>
                            <option value="FORMA DE PAGAMENTO NÃO DETECTADA">Forma de Pagamento não detectada</option>
                            <option value="PAGAMENTO CONFIRMADO">Pagamento Confirmado</option>
                        </select>
                        <button class="btn btn-lg btn-outline-success my-2 my-sm-0" type="submit">
                            <i class="fa fa-search"></i>
                            Buscar
                        </button>
                    </form>

                    <div class="row" v-if="inscricoes">
                        <div class="col-sm12">
                            <p><b>Total de inscrições: </b>{{inscricoes.length}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Data/hora</th>
                                        <th scope="col">Nome/Empresa</th>
                                        <th scope="col">Tipo Inscriçao</th>
                                        <th scope="col">Comprovante Aluno</th>
                                        <th scope="col">Minicurso Grupo 1</th>
                                        <th scope="col">Minicurso Grupo 2</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status do Pagamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="inscricao in inscricoes" :key="inscricao._id">
                                        <td>{{moment(inscricao.createdAt).format('DD/MM/YYYY hh:mm')}}</td>
                                        <td>{{inscricao.dadosBoleto ? inscricao.dadosBoleto.nome : ''}}{{`${inscricao.empresa ? '/'+inscricao.empresa : ''}`}} <br/> {{inscricao.user ? inscricao.user.email : ''}} <br/>CPF: {{inscricao.user ? inscricao.user.cpf : ''}}</td>
                                        <td>{{inscricao.tipoInscricao || (inscricao.tipoInscricaoObj ? inscricao.tipoInscricaoObj.nome : '')}} <br/> {{formataMoney(inscricao.valorInscricao)}}</td>
                                        <td class="text-center">
                                            <a v-if="['ESTUDANTE', 'ESTUDANTE_POS'].indexOf(inscricao.tipoInscricao) > -1 || (inscricao.tipoInscricaoObj && inscricao.tipoInscricaoObj.comprovante)" target="_blank" class="btn btn-secondary" title="Exibir Comprovante inscricao" :href="`${urlServico}/inscricaoAnexo/${inscricao._id}.pdf`">
                                                <i class="fa fa-file-pdf"></i>
                                            </a>
                                            <span v-else>
                                                N/A
                                            </span>
                                        </td>
                                        <td>{{ inscricao.minicurso ? inscricao.minicurso.nome : 'N/A'}} <br/>
                                            {{ inscricao.minicurso ? formataMoney(inscricao.minicurso.preco): 'N/A' }}
                                        </td>
                                        <td>{{ inscricao.minicurso2 ?inscricao.minicurso2.nome : 'N/A'}} <br/>
                                            {{ inscricao.minicurso2 ? formataMoney(inscricao.minicurso2.preco): 'N/A' }}
                                        </td>
                                        <td>{{formataMoney(inscricao.totalAPagar)}}</td>
                                        <td>{{getStatusPagamento(inscricao)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    created () {
        this.busca()
    },
    methods: {
        busca () {
            let filter = {};
            axios.get('/inscricao?populate=user',{params: filter})
            .then(response => {
                let list = response.data
                list.forEach(inscricao => {
                    inscricao.statusPagamento = this.getStatusPagamento(inscricao)
                })
                list.sort((i1, i2) => {
                    if (!i1.statusPagamento || !i2.statusPagamento) return -1;
                    return ('' + i1.statusPagamento).localeCompare(('' + i2.statusPagamento))
                })

                const filtroNomeEStatusPagamento = (inscricao) => {
                    return (this.filtro.nomeCracha && inscricao.dadosBoleto.nome.toUpperCase().indexOf(this.filtro.nomeCracha.toUpperCase()) > -1)
                          && (this.filtro.statusPagamento && this.getStatusPagamento(inscricao) === this.filtro.statusPagamento)
                };

                const filtroNome = (inscricao) => {
                    return (this.filtro.nomeCracha && inscricao.dadosBoleto.nome.toUpperCase().indexOf(this.filtro.nomeCracha.toUpperCase()) > -1);
                }

                const filtroStatusPagamento = (inscricao) => {
                    return (this.filtro.statusPagamento && this.getStatusPagamento(inscricao) === this.filtro.statusPagamento)
                };

                console.log('this.filtro.nomeCracha', this.filtro.nomeCracha);
                console.log('this.filtro.statusPagamento', this.filtro.statusPagamento);

                if (this.filtro.nomeCracha && !this.filtro.statusPagamento) {
                    this.inscricoes = list.filter(inscricao => filtroNome(inscricao))
                } else if (!this.filtro.nomeCracha && this.filtro.statusPagamento) {
                    this.inscricoes = list.filter(inscricao => filtroStatusPagamento(inscricao))
                } else if (this.filtro.nomeCracha && this.filtro.statusPagamento) {
                    this.inscricoes = list.filter(inscricao => filtroNomeEStatusPagamento(inscricao))
                } else {
                    this.inscricoes = list;
                }
            })
        },
        
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
                return 'FORMA DE PAGAMENTO NÃO DETECTADA'
            }

            if (!inscricao.pagseguro) {
                return 'FORMA DE PAGAMENTO NÃO DETECTADA'
            }
        }
    },
    data () {
        return {
            inscricoes: [],
            filtro: {
                statusPagamento: ''
            },
            urlServico: axios.defaults.baseURL
        }
    }
}
</script>
<style scoped>
    .card {
        max-width: 98%!important;
    }
    form {
        margin: 10px auto;
        padding: 10px 20px;
        border-radius: 8px;
        width: 100%;
        background-color: #ffffff;
    }
    input[type=search] {
        margin-bottom: 0 !important;
    }
</style>
