<template>
    <div>
        <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrições realizadas</h1>
                <hr class="small">

                <div class="card-body">
                    <form class="form-inline" @submit.prevent="busca">
                        <input style="width: 60%" class="form-control mr-sm-2" type="search" placeholder="Nome Usuário" aria-label="Search" v-model="filtro.nomeCracha">
                        <button class="btn btn-lg btn-outline-success my-2 my-sm-0" type="submit">
                            <i class="fa fa-search"></i>
                            Buscar
                        </button>
                    </form>

                    <div class="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Data/hora</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Nome/Empresa</th>
                                    <th scope="col">Tipo Inscriçao</th>
                                    <th scope="col">Comprovante Aluno</th>
                                    <th scope="col">Minicurso Grupo 1</th>
                                    <th scope="col">Minicurso Grupo 2</th>
                                    <th scope="col">Total Pago</th>
                                    <th scope="col">Status do Pagamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscricao in inscricoes" :key="inscricao._id">
                                    <td>{{moment(inscricao.createdAt).format('DD/MM/YYYY hh:mm')}}</td>
                                    <td>{{inscricao.user.cpf}}</td>
                                    <td>{{inscricao.dadosBoleto.nome}}{{`${inscricao.empresa ? '/'+inscricao.empresa : ''}`}} <br/> {{inscricao.user ? inscricao.user.email : ''}} </td>
                                    <td>{{inscricao.tipoInscricao}} <br/> {{formataMoney(inscricao.valorInscricao)}}</td>
                                    <td class="text-center">
                                        <a v-if="['ESTUDANTE', 'ESTUDANTE_POS'].indexOf(inscricao.tipoInscricao) > -1" target="_blank" class="btn btn-secondary" title="Exibir Comprovante inscricao" :href="`${urlServico}/inscricaoAnexo/${inscricao._id}.pdf`">
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
</template>
<script>
module.exports = {
    created () {
        this.busca()
    },
    methods: {
        busca () {
            let filter = {};
            if (this.filtro.nomeCracha) {
                 filter.nomeCracha__regex = `/.*${this.filtro.nomeCracha}.*/i`
            }
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
                this.inscricoes = list
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
                return 'PROCESSANDO PAGAMENTO'
            }
        }
    },
    data () {
        return {
            inscricoes: [],
            filtro: {},
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
