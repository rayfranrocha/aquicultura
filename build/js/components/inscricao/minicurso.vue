<template>
    <div class="card">
        <div class="card-header">
            Escolha o minicurso para pagamento
        </div>
        <div class="card-body">
            <div class="grupo1 form-group">
                <h6>Grupo 1</h6>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Desejo Participar</th>
                            <th>Preço</th>
                            <th>Minicurso</th>
                            <th>Vagas Disponíveis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(minicurso, index) in listMinicursoGrupo2" :key="minicurso._id">
                            <td>
                                <input required type="radio" v-model="indexMinicursoGrupo2" name="minicursoSelected2" :value="index" class="checkboxMinicurso">
                            </td>
                            <td>{{formataMoney(minicurso.preco)}}</td>
                            <td>{{minicurso.nome}}</td>
                            <td class="vagaMinicurso">{{minicurso.disponiveis}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grupo2 form-group">
                <h6>Grupo 2</h6>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Desejo Participar</th>
                            <th>Preço</th>
                            <th>Minicurso</th>
                            <th>Vagas Disponíveis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(minicurso, index) in listMinicursoGrupo3" :key="minicurso._id">
                            <td>
                                <input required type="radio" v-model="indexMinicursoGrupo3" name="minicursoSelected3" :value="index" class="checkboxMinicurso">
                            </td>
                            <td>{{formataMoney(minicurso.preco)}}</td>
                            <td>{{minicurso.nome}}</td>
                            <td class="vagaMinicurso">{{minicurso.disponiveis}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Preço</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Minicursos Grupo 1</td>
                        <td id="precoMinicurso">
                            {{formataMoney(valorMinicursoGrupo2)}}
                            <button v-if="valorMinicursoGrupo2 > 0" type="button" class="btn btn-danger btn-sm" @click="limpar('grupo2')">
                                <i class="fas fa-remove"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Minicurso Grupo 2</td>
                        <td id="precoInscricao">
                            {{formataMoney(valorMinicursoGrupo3)}}
                            <button v-if="valorMinicursoGrupo3 > 0" type="button" class="btn btn-danger btn-sm" @click="limpar('grupo3')">
                                <i class="fas fa-remove"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Total A Pagar</td>
                        <td id="precoTotal">{{formataMoney(valorTotal)}}</td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <button :disabled=isDisabledButton type="button" class="btn btn-primary btn-lg">Realizar Pagamento</button>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        computed: {
            valorTotal () {
                return this.valorMinicursoGrupo3 + this.valorMinicursoGrupo2
            },
            isDisabledButton () {
                return (this.valorMinicursoGrupo3 + this.valorMinicursoGrupo2) === 0
            }
        },
        data () {
            return {
                minicursoGrupo2: null,
                minicursoGrupo3: null,
                listMinicursoGrupo2: [],
                listMinicursoGrupo3: [],
                valorMinicursoGrupo2: 0,
                valorMinicursoGrupo3: 0,
                indexMinicursoGrupo2: null,
                indexMinicursoGrupo3: null,
            }
        },
        watch: {
            indexMinicursoGrupo2: function(newValue) {
                if (newValue || newValue === 0) {
                    this.minicursoGrupo2 = this.listMinicursoGrupo2[newValue];
                    console.log('Minicurso2', this.minicursoGrupo2)
                    this.valorMinicursoGrupo2 = this.minicursoGrupo2.preco;
                } else {
                    this.valorMinicursoGrupo2 = 0;
                }
            },
            indexMinicursoGrupo3: function(newValue) {
                if (newValue || newValue === 0) {
                    this.minicursoGrupo3 = this.listMinicursoGrupo3[newValue];
                    console.log('Minicurso3', this.minicursoGrupo3)
                    this.valorMinicursoGrupo3 = this.minicursoGrupo3.preco;
                } else {
                    this.valorMinicursoGrupo3 = 0;
                }
            }
        },
        created () {
            axios.get(`/inscricao/${window.localStorage.getItem('inscricao')}`)
                .then(response => this.inscricao = response.data);
            axios.get('/vaga?grupo=2')
                .then(response => this.listMinicursoGrupo2 = response.data);
            axios.get('/vaga?grupo=3')
                .then(response => this.listMinicursoGrupo3 = response.data);
        },

        methods: {
            formataMoney (valor) {
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            },
            limpar (tipo) {
                if (tipo === 'grupo2') {
                    this.valorMinicursoGrupo2 = 0;
                    this.indexMinicursoGrupo2 = null;
                }

                if (tipo === 'grupo3') {
                    this.valorMinicursoGrupo3 = 0;
                    this.indexMinicursoGrupo3 = null;
                }
            },

            pagar () {
                let dadosMinicurso = {
                    minicurso: this.minicursoGrupo2,
                    minicursoGrupo3: this.minicursoGrupo3,
                    valorTotalMinicurso: this.valorTotal
                }
                axios.put(`/inscricao/minicurso/${this.inscricao.id}`, dadosMinicurso)
                        .then(response => {
                            axios.post('/pagseguro/minicurso', {id: this.inscricao.id})
                                .then(response => {
                                    console.log('Pagesguro response', response.data)

                                    PagSeguroLightbox({
                                        code: response.data.checkout.code[0]
                                    }, {
                                        success: function(transactionCode) {
                                            console.log(transactionCode)
                                            self.dadosInscricao.transactionCodeMinicurso3 = transactionCode
                                            axios.put(`/inscricao/${self.id}`, self.dadosInscricao)
                                                .then(reponse => {
                                                    console.log(response.data);
                                                    window.location.href = "arearestrita.html";
                                                });
                                        },
                                        abort: function() {
                                        }
                                    });
                                });
                        });
            }
        }
    }
</script>
