<template>
    <div>
        <div class="container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Dados Cracha</th>
                        <th scope="col">Dados inscrição</th>
                        <th scope="col">Valor Da Inscrição</th>
                        <th scope="col">Dados Minicurso</th>
                        <th scope="col">Valor Do minicurso</th>
                        <th scope="col">Status do Pagamento</th>
                        <th scope="col">Comprovante tipo Inscrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="inscricao in inscricoes" :key="inscricao._id">
                        <td>
                            <ul>
                                <li>Nome: {{inscricao.nomeCracha}}</li>
                                <li>Empresa: {{inscricao.empresa}}</li>
                                <li>Sexo: {{inscricao.sexo}}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>Data: {{inscricao.createdAt}}</li>
                                <li>Tipo: {{inscricao.tipo}}</li>
                            </ul>
                        </td>
                        <td>
                            {{inscricao.valorTotal}}
                        </td>
                        <td>
                            {{inscricao.minicurso}}
                        </td>
                        <td>
                            {{inscricao.minicurso}}
                        </td>
                        <td>
                            {{inscricao.statusPagamento}}
                        </td>
                        <td>
                            <a href="#{{inscricao._id}}">PDF</a>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            axios.get('/inscricoes')
            .then(response => {
                this.inscricoes = response.data
            })
        }
    },
    data () {
        return {
            inscricoes: []
        }
    }
}
</script>

