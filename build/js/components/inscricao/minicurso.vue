<template>
    <div class="card">
        <div class="card-header">
            Escolha o minicurso para pagamento
        </div>
        <div class="card-body">
            <form @submit.prevent="pagar">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <label for="nome">Nome para o crachá*:</label>
                    <input required type="text" id="nome" name="nome" v-model="dadosInscricao.dadosBoleto.nome">

                    <label for="telefone">Telefone Celular*:</label>
                    <input required type="tel" id="telefone" name="telefone" v-model="dadosInscricao.telefone">

                    <label for="email">Email*:</label>
                    <input required type="email" id="email" name="email" v-model="dadosInscricao.email">
                </div>
                <div class="form-group" v-if="!inscricaoMinicurso">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="tipoInscricao">Minicurso</label>
                        </div>
                        <select name="cars" class="custom-select" v-model="minicursoSelected">
                            <option :value="null">Selecione o Minicurso</option>
                            <option v-for="(minicurso, index) in listMinicurso" :value="index" :key="minicurso._id">
                                {{minicurso.nome}} - Preço: {{formataMoney(minicurso.preco)}} - Vagas Disponíveis: {{minicurso.disponiveis}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="form-group" v-if="!inscricaoMinicurso2">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="tipoInscricao">Minicurso 2</label>
                        </div>
                        <select name="cars" class="custom-select" v-model="minicursoSelected3">
                            <option :value="null">Selecione o Minicurso 2</option>
                            <option v-for="(minicurso, index) in listMinicurso3" :value="index" :key="minicurso._id">{{minicurso.nome}} 
                                <p>- Preço: {{formataMoney(minicurso.preco)}} - Vagas Disponíveis: {{minicurso.disponiveis}}</p>
                            </option>
                        </select>
                    </div>
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
                                {{formataMoney(valorMinicurso)}}
                                <button v-if="valorMinicurso > 0" type="button" class="btn btn-danger btn-sm" @click="limpar('grupo2')">
                                    <i class="fas fa-remove"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Minicurso Grupo 2</td>
                            <td id="precoInscricao">
                                {{formataMoney(valorMinicurso3)}}
                                <button v-if="valorMinicurso3 > 0" type="button" class="btn btn-danger btn-sm" @click="limpar('grupo3')">
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
                    <button :disabled=isDisabledButton type="submit" class="btn btn-primary">Realizar Pagamento</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    module.exports = {
        mounted() {
            jQuery('#telefone').mask('(00) 00000-0000');
            jQuery('#nome').focus();
        },
        computed: {
            valorTotal () {
                return this.valorMinicurso + this.valorMinicurso3
            },
            isDisabledButton () {
                return (this.valorMinicurso + this.valorMinicurso3) === 0
            },
            idUser () {
                return window.localStorage.getItem('user');
            }
        },
        data () {
            return {
                dadosInscricao: {
                    telefone: null,
                    email: null,
                    dadosBoleto: {
                        nome: null
                    },
                    tipoInscricao: null,
                    formaPagamento: 'PAGSEGURO',
                    minicurso: null
                },
                listMinicurso: [],
                listMinicurso3: [],
                minicursoSelected: null,
                minicursoSelected3: null,
                valorMinicurso: 0,
                valorMinicurso3: 0,
                indexMinicursoGrupo2: null,
                indexMinicursoGrupo3: null,
                inscricaoMinicurso: null,
                inscricaoMinicurso2: null
            }
        },
        watch: {
            minicursoSelected: function(newValue) {
                if (newValue || newValue === 0) {
                    this.dadosInscricao.minicurso = this.listMinicurso[newValue];
                    console.log('Minicurso', this.dadosInscricao.minicurso)
                    this.valorMinicurso = this.dadosInscricao.minicurso.preco;
                } else {
                    this.valorMinicurso = 0;
                }
            },
            minicursoSelected3: function(newValue) {
                if (newValue || newValue === 0) {
                    this.dadosInscricao.minicursoGrupo3 = this.listMinicurso3[newValue];
                    console.log('Minicurso', this.dadosInscricao.minicursoGrupo3)
                    this.valorMinicurso3 = this.dadosInscricao.minicursoGrupo3.preco;
                } else {
                    this.valorMinicurso3 = 0;
                }
            }
        },
        created () {
            axios.get(`/inscricao?user=${this.idUser}`)
                .then(response => {
                    this.listInscricao = response.data;
                    this.inscricaoMinicurso = this.listInscricao.find(inscricao => inscricao.minicurso);
                    this.inscricaoMinicurso2 = this.listInscricao.find(inscricao => inscricao.minicurso2);
                });
            axios.get('/vaga?grupo=2')
                .then(response => this.listMinicurso = response.data);
            axios.get('/vaga?grupo=3')
                .then(response => this.listMinicurso3 = response.data);
        },

        methods: {
            formataMoney (valor) {
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            },
            limpar (tipo) {
                if (tipo === 'grupo2') {
                    this.valorMinicurso = 0;
                    this.indexMinicursoGrupo2 = null;
                    this.minicursoSelected = null;
                }

                if (tipo === 'grupo3') {
                    this.valorMinicurso3 = 0;
                    this.indexMinicursoGrupo3 = null;
                    this.minicursoSelected3 = null;
                }
            },

            pagar () {
                const self = this;
                let dadosMinicurso = {
                    email: this.dadosInscricao.email,
                    telefone: this.dadosInscricao.telefone,
                    dadosBoleto: this.dadosInscricao.dadosBoleto,
                    minicurso: this.dadosInscricao.minicurso,
                    minicurso2: this.dadosInscricao.minicursoGrupo3,
                    totalAPagar: this.valorTotal,
                    user: this.idUser
                }
                axios.post(`/inscricao/`, dadosMinicurso)
                        .then(response => {
                            const inscricao = response.data;
                            axios.post('/pagseguro', {id: inscricao._id})
                                .then(response => {
                                    console.log('Pagesguro response', response.data)

                                    PagSeguroLightbox({
                                        code: response.data.checkout.code[0]
                                    }, {
                                        success: function(transactionCode) {
                                            self.dadosInscricao.transactionCode = transactionCode
                                            axios.put(`/inscricao/${inscricao._id}`, self.dadosInscricao)
                                                .then(reponse => {
                                                    console.log(response.data);
                                                    window.location.href = "arearestrita.html";
                                                });
                                        },
                                        abort: function() {
                                            axios.delete(`/inscricao/${inscricao._id}`);
                                        }
                                    });
                                });
                        });
            }
        }
    }
</script>
