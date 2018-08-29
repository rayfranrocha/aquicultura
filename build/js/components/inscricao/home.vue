<template>
    <div>
        <div class="container card" v-if="$route.name.indexOf('inscricao') >= 0 || $route.name.indexOf('produto') >= 0">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">INSCRIÇÕES</h1>
            <hr class="small">
            <div class="table-head u-margin-top-small">
                <h3>Tabela de Preços</h3>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Categoria</th>
                        <th scope="col">Até 21/09</th>
                        <th scope="col">21/09 a 02/11</th>
                        <th scope="col">Local</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tipoInscricao in listTipoInscricao" :key="tipoInscricao._id">
                        <td>{{tipoInscricao.nome}}</td>
                        <td>{{formataMoney(tipoInscricao.precoAte21)}}</td>
                        <td>{{formataMoney(tipoInscricao.precoApos21)}}</td>
                        <td>{{formataMoney(tipoInscricao.precoLocal)}}</td>
                    </tr>
                    <tr>
                        <td>
                            Minicursos
                        </td>
                        <td>R$50,00</td>
                        <td>R$50,00</td>
                        <td>R$50,00</td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container card">

            <div class="formulario-contato">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data () {
            return {
                listTipoInscricao: []
            }
        },
        created () {
            axios.get('/tipoInscricao')
                .then(response => this.listTipoInscricao = response.data);
        },
        methods: {
            formataMoney (valor) {
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            }
        }
    }
</script>