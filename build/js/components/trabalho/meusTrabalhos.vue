<template>
    <div>
        <section id="meusTrabalhosSection" class="trabalhos-list">
            <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Meus Trabalhos</h1>
                <a href="./orientacaopremios.html">
                        <button class="bt-flat-azul" type="button">Orientações e Prêmios</button>
                </a>
                <hr class="small">
                <div class="row">
                    <div class="col-xs-12 col-md-12 col-sm-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="w-10" scope="col">Código</th>
                                    <th class="w-10" scope="col">Data envio</th>
                                    <th class="w-50" scope="col">Título</th>
                                    <th class="w-15" scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trabalho in listTrabalhos" :key="trabalho._id">
                                    <td>{{trabalho._id.substr(0,6)}}</td>
                                    <td>{{formataData(trabalho.createdAt)}}</td>
                                    <td>{{trabalho.titulo}}</td>
                                    <td>{{trabalho.status}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
module.exports = {
    data () {
        return {
            listTrabalhos: []
        }
    },
    created() {
        axios.get(`/trabalhoRest?user__equals=${window.localStorage.getItem("user")}`)
            .then(response => {
                this.listTrabalhos = response.data;
            });
    },
    methods: {
        formataData (data) {
            return moment(data).format('DD/MM/YYYY hh:mm')
        }
    }
}
</script>
