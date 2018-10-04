<template>
    <div>
        <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrições realizadas</h1>
                <hr class="small">

                <div class="card-body">
                    <form @submit.prevent="busca">
                        <div class="row">
                            <div class="col">
                                <input class="form-control" type="search" placeholder="Nome Usuário" aria-label="Search" v-model="filtro.nomeCracha">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <select v-model="filtro.statusPagamento" name="statusPagamento" id="statusPagamento" class="form-control custom-select mr-sm-2">
                                    <option value="">Selecione o status...</option>
                                    <option value="AGUARDANDO PAGAMENTO">Aguardando Pagamento</option>
                                    <option value="FORMA DE PAGAMENTO NÃO DETECTADA">Forma de Pagamento não detectada</option>
                                    <option value="PAGAMENTO CONFIRMADO">Pagamento Confirmado</option>
                                </select>
                            </div>
                            <div class="col">
                                <select v-model="minicurso" class="form-control" name="minicurso" id="minicurso">
                                    <option :value="null">Selecione o minicurso ou tipo de inscricao...</option>
                                    <optgroup label="Tipo Inscrição">
                                       <option v-for="tipoInscricao in listTipoInscricao" :value="tipoInscricao" :key="tipoInscricao._id" v-text="tipoInscricao.nome" />
                                    </optgroup>
                                    <optgroup label="Minicurso: Grupo 1">
                                        <option v-for="minicurso1 in minicursos1" :value="minicurso1" :key="minicurso1._id" v-text="minicurso1.nome" />
                                    </optgroup>
                                    <optgroup label="Minicurso: Grupo 2">
                                        <option v-for="minicurso2 in minicursos2" :value="minicurso2" :key="minicurso2._id" v-text="minicurso2.nome" />
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-center">
                                <button class="btn btn-lg btn-outline-success my-2 my-sm-0" type="submit">
                                    <i class="fa fa-search"></i>
                                    Buscar
                                </button>
                            </div>
                        </div>
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
        axios.get('/vaga')
            .then(response => {
                let listVagas = response.data;
                this.minicursos1 = listVagas.filter(vaga => vaga.grupo === 2)
                this.minicursos2 = listVagas.filter(vaga => vaga.grupo === 3)
            });
        axios.get('/tipoInscricao')
            .then(response => {
                let listTipoInscricao = response.data;
                this.listTipoInscricao = listTipoInscricao;
            });
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

                const filtroMinicurso2 = (inscricao, minicurso) => {
                    if (!inscricao.minicurso) {
                        return false;
                    }
                    return inscricao.minicurso._id === minicurso._id
                };

                const filtroMinicurso3 = (inscricao, minicurso) => {
                    if (!inscricao.minicurso2) {
                        return false;
                    }
                    return inscricao.minicurso2._id === minicurso._id
                };

                console.log('this.filtro.nomeCracha', this.filtro.nomeCracha);
                console.log('this.filtro.statusPagamento', this.filtro.statusPagamento);

                this.inscricoes = list;
                if (this.filtro.nomeCracha) {
                    this.inscricoes = this.inscricoes.filter(inscricao => filtroNome(inscricao))
                }
                if (this.filtro.statusPagamento) {
                    this.inscricoes = this.inscricoes.filter(inscricao => filtroStatusPagamento(inscricao))
                }
                if (this.minicurso) {
                    if (this.minicurso.grupo === 2) {
                        this.inscricoes = this.inscricoes.filter(inscricao => filtroMinicurso2(inscricao, this.minicurso))
                    }
                    if (this.minicurso.grupo === 3) {
                        this.inscricoes = this.inscricoes.filter(inscricao => filtroMinicurso3(inscricao, this.minicurso))
                    }
                    if (this.minicurso.precoAte21) {
                        this.inscricoes = this.inscricoes.filter(inscricao => {
                            let nmTipoInscricao = inscricao.tipoInscricao || (inscricao.tipoInscricaoObj ? inscricao.tipoInscricaoObj.nome : '');
                            return this.minicurso.nome === nmTipoInscricao
                        });
                    }
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

            if (inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '3' || inscricao.statusPagseguro && inscricao.statusPagseguro.transaction.status[0] === '4') {
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
            urlServico: axios.defaults.baseURL,
            minicursos1: [],
            minicursos2: [],
            minicurso: null,
            listTipoInscricao: []
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
