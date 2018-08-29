<template>
    <div>
            <form @submit.prevent="pagar">
                <input type="hidden" name="iot" value="button" />
                <fieldset>
                    <div class="row">
                        <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 3 DE 3</h2>
                        <hr class="small">
                        
                        <div class="passo-3 col-md-12 col-sm-12 col-xs-12">
                            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrição minicursos e pagamento</h1>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="tipoInscricao">Tipo *</label>
                                </div>
                                <select required v-model="dadosInscricao.tipoInscricao" class="custom-select" id="tipoInscricao">
                                    <option :value="null" selected>Escolha um tipo de inscrição...</option>
                                    <option value="ESTUDANTE">Estudante de curso técnico ou Graduação</option>
                                    <option value="ESTUDANTE_POS">Estudante de Pós-Graduação</option>
                                    <option value="PROFISSIONAL">Profissional</option>
                                    <option value="MINI_CURSO">Participação apenas do minicurso</option>
                                </select>
                            </div>
                            <div v-if="dadosInscricao.tipoInscricao === 'ESTUDANTE' || dadosInscricao.tipoInscricao === 'ESTUDANTE_POS'" class="passo-4 col-md-12 col-sm-12 col-xs-12">
                                <h3 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Anexo para comprovação do tipo de inscrição</h3>
                                <input required class="form-control" style="margin: 3rem 0;" type="file" name="arquivo" id="arquivo" accept="application/pdf">
                            </div>
                            <div v-if="dadosInscricao.formaPagamento !== 'PAGSEGURO'" class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="tipoPagamento">Pagamento *</label>
                                </div>
                                <select disabled="disabled" required v-model="dadosInscricao.formaPagamento" class="custom-select" id="tipoPagamento">
                                    <option value="PAGSEGURO" selected>Cartão ou Boleto Bancário via Pagseguro</option>
                                </select>
                            </div>
                            <div v-if="dadosInscricao.tipoInscricao !== 'MINI_CURSO'" class="form-group form-check">
                                <input v-model="participaMinicurso" type="checkbox" class="form-check-input" id="participar_minicurso">
                                <label class="form-check-label" for="participar_minicurso">Quero participar de minicursos</label>
                            </div>
                            <div v-if="participaMinicurso || dadosInscricao.tipoInscricao === 'MINI_CURSO'" class="form-group">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="tipoInscricao">Minicurso</label>
                                    </div>
                                    <select name="cars" class="custom-select" v-model="minicursoSelected">
                                        <option :value="null">Selecione o Minicurso</option>
                                        <option v-for="(minicurso, index) in listMinicurso" :value="index" :key="minicurso._id">
                                            {{minicurso.nome}} - Preço: {{formataMoney(minicurso.preco)}} - Vagas Disponíveis: {{minicurso.vagas}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div v-if="participaMinicurso || dadosInscricao.tipoInscricao === 'MINI_CURSO'" class="form-group">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="tipoInscricao">Minicurso 2</label>
                                    </div>
                                    <select name="cars" class="custom-select" v-model="minicursoSelected3">
                                        <option :value="null">Selecione o Minicurso 2</option>
                                        <option v-for="(minicurso, index) in listMinicurso3" :value="index" :key="minicurso._id">{{minicurso.nome}} 
                                            <p>- Preço: {{formataMoney(minicurso.preco)}} - Vagas Disponíveis: {{minicurso.vagas}}</p>
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
                                        <td>Minicursos (Grupo 1 + Grupo 2)</td>
                                        <td id="precoMinicurso">{{formataMoney(valorMinicurso + valorMinicurso3)}}</td>
                                    </tr>
                                    <tr>
                                        <td>Inscrição</td>
                                        <td id="precoInscricao">{{formataMoney(valorInscricao)}}</td>
                                    </tr>
                                    <tr>
                                        <td>Total A Pagar</td>
                                        <td id="precoTotal">{{formataMoney(valorTotal)}}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        
                    </div>
                </fieldset>

                <div class="row" id="botoesDiv">
                    <div class="col" id="anterior">
                        <button @click.prevent="anterior()" id="btAnterior" class="bt-flat-azul" type="button">Anterior</button>
                    </div>
                    <div class="col" id="proximo">
                        <button :disabled="valorTotal === 0" type="submit" class="bt-flat-azul">Realizar pagamento</button>
                    </div>
                </div>
            </form>
        
    </div>
</template>

<script>
module.exports = {
    computed: {
        id () {
            return this.$store.getters.idInscricao
        },
        valorTotal () {
            return this.valorInscricao + this.valorMinicurso + this.valorMinicurso3
        },
        minicursoSelected () {
            return this.minicursoSelected
        },
        tipoInscricao () {
            return this.dadosInscricao.tipoInscricao
        }
    },
    created () {
        axios.get('/vaga?grupo=2')
            .then(response => this.listMinicurso = response.data)
        axios.get('/vaga?grupo=3')
            .then(response => this.listMinicurso3 = response.data)
    },
    data: function () {
        return {
            listMinicurso: [],
            listMinicurso3: [],
            minicursoSelected: null,
            minicursoSelected3: null,
            dadosInscricao: {
                tipoInscricao: null,
                formaPagamento: 'PAGSEGURO',
                minicurso: null
            },
            participaMinicurso: false,
            valorInscricao: 0,
            valorMinicurso: 0,
            valorMinicurso3: 0
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
        },
        tipoInscricao: function(newValue) {
            if (newValue) {
                this.valorInscricao = this.getPreco(newValue);
                participaMinicurso = newValue === 'MINI_CURSO';
            }
        }
    },
    methods: {
        formataMoney (valor) {
            return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
        },
        anterior () {
            this.$router.push({name: 'passo2'})
        },
        getPreco (tipoInscricao) {
            var dataBase = new Date();
            dataBase.setDate(21);
            dataBase.setMonth(8);

            var dataAtual = new Date();

            switch (tipoInscricao) {
            case "ESTUDANTE":
                if (dataAtual < dataBase) {
                    return 50
                } else {
                    return 70
                }
                break;
            case "ESTUDANTE_POS":
                if (dataAtual < dataBase) {
                    return 70
                } else {
                    return 100
                }
                break;
            case "PROFISSIONAL":
                if (dataAtual < dataBase) {
                    return 150
                } else {
                    return 200
                }
                break;
            case "MINI_CURSO": /* Participa apenas de minicurso */
                return 0
            default:
                return 0
            }
        },

        pagarNoLocal() {

        },
        pagar () {
            this.dadosInscricao.totalAPagar = this.valorTotal;
            this.dadosInscricao.valorInscricao = this.valorInscricao;
            
            if (this.dadosInscricao.tipoInscricao === 'ESTUDANTE' || this.dadosInscricao.tipoInscricao === 'ESTUDANTE_POS') {
                var formData = new FormData();
                
                var arquivo = document.querySelector('#arquivo');
                formData.append("file", arquivo.files[0]);

                const self = this;

                axios.post(`/inscricao/${this.id}/comprovante`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(response => {
                       axios.put(`/inscricao/${this.id}`, this.dadosInscricao)
                        .then(response => {
                            axios.post('/pagseguro', {id: this.id})
                                .then(response => {
                                    console.log('Pagesguro response', response.data)

                                    PagSeguroLightbox({
                                        code: response.data.checkout.code[0]
                                    }, {
                                        success: function(transactionCode) {
                                            console.log(transactionCode)
                                            self.dadosInscricao.transactionCode = transactionCode
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
                    });
            } else {
                const self = this;
                axios.put(`/inscricao/${this.id}`, this.dadosInscricao)
                .then(response => {
                    axios.post('/pagseguro', {id: this.id})
                        .then(response => {
                            console.log('Pagesguro response', response.data)

                            PagSeguroLightbox({
                                code: response.data.checkout.code[0]
                            }, {
                                success: function(transactionCode) {
                                    console.log(transactionCode)
                                    self.dadosInscricao.transactionCode = transactionCode
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
}
</script>