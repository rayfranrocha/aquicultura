<template>
    <div>
        <section id="meusTrabalhosSection" class="trabalhos-list">
            <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Trabalhos Para aprovação</h1>
                <hr class="small">
                <div class="row">
                    <div class="col-xs-12 col-md-12 col-sm-12">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="w-10" scope="col">Código</th>
                                    <th class="w-10" scope="col">Data envio</th>
                                    <th class="w-75" scope="col">Título</th>
                                    <th class="w-75" scope="col">Autores</th>
                                    <th class="w-75" scope="col">Email Autores</th>
                                    <th class="w-15" scope="col">Status</th>
                                    <th class="w-15" scope="col">Anexo</th>
                                    <th class="w-15" scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trabalho in listTrabalhos" :key="trabalho._id">
                                    <td>{{trabalho._id.substr(0,6)}}</td>
                                    <td>{{formataData(trabalho.createdAt)}}</td>
                                    <td>{{trabalho.titulo}}</td>
                                    <td>{{trabalho.autores}}</td>
                                    <td>{{trabalho.emailAutores}}</td>
                                    <td>{{trabalho.status}}</td>
                                    <td class="text-center">
                                        <a target="_blank" class="btn btn-secondary" title="Exibir Anexo" :href="`${urlServico}/trabalhoAnexo/${trabalho._id}.pdf`">
                                            <i class="fa fa-file-pdf"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <button class="btn btn-secondary" title="Visualizar"
                                            @click="visualiza(trabalho)" >
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <div id="modalAprovacao" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Visualizar Trabalho Submetido</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="trabalho">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col">
                                        <label>Título</label>
                                        <span>{{trabalho.titulo}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="">Autores:</label>
                                        <span>{{trabalho.autores}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="">Email dos Autores:</label>
                                        <span>{{trabalho.emailAutores}}</span>
                                    </div>
                                </div>
                                <div class="row align-items-center">
                                    <div class="col-3">
                                        <a target="_blank" :href="`${urlServico}/trabalhoAnexo/${trabalho._id}.pdf`" class="btn btn-warning">
                                            <i class="fa fa-paperclip"></i>
                                            <span>Anexo</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label>Resumo:</label>
                                    <textarea rows="5" class="form-control" v-model="trabalho.resumo"></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Abstract:</label>
                                    <textarea rows="5" class="form-control" v-model="trabalho.abstract" ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="trabalho">
                    <button v-if="trabalho.status !== 'Aprovado'" type="button" @click="aprovar" class="btn btn-success">Aprovar</button>
                    <button type="button" @click="reprovar" class="btn btn-danger" data-dismiss="modal">Reprovar</button>
                </div>
                </div>
            </div>
            </div>
    </div>
</template>
<script>
module.exports = {
    computed: {
        user () {
            return JSON.parse(decodeURIComponent(escape(window.atob( window.localStorage.getItem('auth-token').split('.')[1] ))));
        }
    },
    data () {
        return {
            listTrabalhos: [],
            filtro: {},
            urlServico: axios.defaults.baseURL,
            trabalho: null
        }
    },
    created() {
        this.busca()
    },
    methods: {
        formataData (data) {
            return moment(data).format('DD/MM/YYYY hh:mm')
        },
        busca () {
            axios.get(`/trabalhoRest`, {params: this.filtro})
                .then(response => {
                    this.listTrabalhos = response.data;
                });
        },
        visualiza (trabalho) {
            this.trabalho = trabalho;
            jQuery('#modalAprovacao').modal('show')
        },
        aprovar () {
            axios.put(`/trabalhoRest/${this.trabalho._id}`, {
                status: 'Aprovado',
                userAprovacao: this.user._id,
                dtHoraAprovacao: new Date()
            }).then((response) => {
                jQuery('#modalAprovacao').modal('hide');
                this.busca();
            });
        },

        reprovar () {
            axios.put(`/trabalhoRest/${this.trabalho._id}`, {
                status: 'Reprovado',
                userAprovacao: this.user._id,
                dtHoraAprovacao: new Date()
            }).then((response) => {
                jQuery('#modalAprovacao').modal('hide');
                this.busca();
            });
        }
    }
}
</script>
<style scoped>
    .card {
        max-width: 98%!important;
    }
</style>

