<template>
    <div>
        <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrição no evento</h1>
        <hr class="small">

        <form @submit.prevent="pagar">
            <fieldset>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="tipoInscricao">Tipo *</label>
                        </div>
                        <select required v-model="dadosInscricao.tipoInscricaoObj" class="custom-select" id="tipoInscricao">
                            <option :value="null" selected>Escolha um tipo de inscrição...</option>
                            <option v-for="tipoInscricao in listTipoInscricao" :key="tipoInscricao._id" :value="tipoInscricao">{{tipoInscricao.nome}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row" v-if="dadosInscricao.tipoInscricaoObj && dadosInscricao.tipoInscricaoObj.comprovante">
                <div class="passo-4 col-md-12 col-sm-12 col-xs-12">
                    <h3 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Anexo para comprovação do tipo de inscrição</h3>
                    <input required class="form-control" style="margin: 3rem 0;" type="file" name="arquivo" id="arquivo" accept="application/pdf">
                </div>
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
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <label  for="cpf_cnpj">CPF/CNPJ*:</label>
                    <input required v-model="dadosInscricao.dadosBoleto.cpfCnpj" type="text" id="cpf_cnpj" name="cpf_cnpj">
                    <label for="nome">Nome para o crachá*:</label>
                    <input required type="text" id="nome" name="nome" v-model="dadosInscricao.dadosBoleto.nome">
                    <label for="empresa">Empresa/Instituição*:</label>
                    <input required type="text" id="empresa" name="empresa" v-model="dadosInscricao.empresa">
                    <label for="sexo">Sexo*:</label>
                    <input required type="text" id="sexo" name="sexo" v-model="dadosInscricao.sexo">
                    <label for="telefone">Telefone Celular*:</label>
                    <input required type="tel" id="telefone" name="telefone" v-model="dadosInscricao.telefone">
                    <label for="email">Email*:</label>
                    <input required type="email" id="email" name="email" v-model="dadosInscricao.email">
                    <label for="endereco">Endereço*:</label>
                    <input required v-model="dadosInscricao.dadosBoleto.endereco" type="text" id="endereco" name="endereco">
                </div>
            </div>
            
            <div class="row">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Inscricao</td>
                            <td id="precoTotal">{{formataMoney(valorInscricao)}}</td>
                        </tr>
                        <tr v-if="!inscricaoMinicurso">
                            <td>Minicurso 1</td>
                            <td id="precoTotal">{{formataMoney(valorMinicurso)}}</td>
                        </tr>
                        <tr v-if="!inscricaoMinicurso2">
                            <td>Minicurso 2</td>
                            <td id="precoTotal">{{formataMoney(valorMinicurso3)}}</td>
                        </tr>
                        <tr>
                            <td>Total A Pagar</td>
                            <td id="precoTotal">{{formataMoney(valorTotal)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col">
                    <router-link :to="{name: 'produtos'}" tag="a" class="btn btn-block btn-secondary">Voltar</router-link>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-block btn-primary">Realizar Pagamento</button>
                </div>
            </div>
            </fieldset>
        </form>
    </div>
</template>
<script>
    module.exports = {
        mounted() {
            jQuery('#telefone').mask('(00) 00000-0000');
            jQuery('#nome').focus();
        },
        data: function () {
            return {
                indexMinicursoGrupo2: null,
                indexMinicursoGrupo3: null,
                inscricaoMinicurso: null,
                inscricaoMinicurso2: null,
                listMinicurso: [],
                listMinicurso3: [],
                valorMinicurso: 0,
                valorMinicurso3: 0,
                minicursoSelected: null,
                minicursoSelected3: null,
                inscricaoMinicurso: null,
                inscricaoMinicurso2: null,
                listTipoInscricao: [],
                dadosInscricao: {
                    tipoInscricaoObj: null,
                    formaPagamento: 'PAGSEGURO',
                    minicurso: null,
                    dadosBoleto: {
                        nome: null,
                        cpfCnpj: null,
                        endereco: null
                    }
                }
            }
        },
        watch: {
            minicursoSelected: function(newValue) {
                if (newValue || newValue === 0) {
                    this.dadosInscricao.minicurso = this.listMinicurso[newValue];
                    this.valorMinicurso = this.dadosInscricao.minicurso.preco;
                } else {
                    this.valorMinicurso = 0;
                }
            },
            minicursoSelected3: function(newValue) {
                if (newValue || newValue === 0) {
                    this.dadosInscricao.minicurso2 = this.listMinicurso3[newValue];
                    this.valorMinicurso3 = this.dadosInscricao.minicurso2.preco;
                } else {
                    this.valorMinicurso3 = 0;
                }
            }
        },
        computed: {
            valorTotal () {
                return this.valorInscricao + this.valorMinicurso + this.valorMinicurso3
            },
            valorInscricao () {
                if (this.dadosInscricao.tipoInscricaoObj) {
                    var dataBase = new Date();
                    dataBase.setDate(21);
                    dataBase.setMonth(8);

                    var dataAtual = new Date();
                     if (dataAtual < dataBase) {
                         return this.dadosInscricao.tipoInscricaoObj.precoAte21
                     } else {
                         return this.dadosInscricao.tipoInscricaoObj.precoApos21
                     }
                } else {
                    return 0;
                }
            },
            idUser () {
                return window.localStorage.getItem('user');
            }
        },
        created () {
            axios.get(`/inscricao?user=${this.idUser}`)
                .then(response => {
                    this.listInscricao = response.data;
                    this.inscricaoMinicurso = this.listInscricao.find(inscricao => inscricao.minicurso);
                    this.inscricaoMinicurso2 = this.listInscricao.find(inscricao => inscricao.minicurso2);
                });
            axios.get('/tipoInscricao')
                .then(response => this.listTipoInscricao = response.data);
            axios.get('/vaga?grupo=2')
                .then(response => this.listMinicurso = response.data);
            axios.get('/vaga?grupo=3')
                .then(response => this.listMinicurso3 = response.data);
        },
        methods: {
            formataMoney (valor) {
                return `R$ ${valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            },
            handlePagSeguro (idInscricao) {
                const self = this;
                axios.post('/pagseguro', {id: idInscricao})
                    .then(response => {
                        console.log('Pagesguro response', response.data)

                        PagSeguroLightbox({
                            code: response.data.checkout.code[0]
                        }, {
                            success: function(transactionCode) {
                                console.log(transactionCode)
                                self.dadosInscricao.transactionCode = transactionCode
                                axios.put(`/inscricao/${idInscricao}`, self.dadosInscricao)
                                    .then(reponse => {
                                        console.log(response.data);
                                        window.location.href = "arearestrita.html";
                                    });
                            },
                            abort: function() {
                                axios.delete(`/inscricao/${idInscricao}`);
                            }
                    });
                });
            },
            pagar () {
                this.dadosInscricao.user = this.idUser;
                this.dadosInscricao.totalAPagar = this.valorTotal;
                
                axios.post('/inscricao', this.dadosInscricao)
                    .then(response => {
                        let inscricao = response.data;

                        if (inscricao.tipoInscricaoObj.comprovante) {
                            var formData = new FormData();
                            var arquivo = document.querySelector('#arquivo');
                            formData.append("file", arquivo.files[0]);

                            axios.post(`/inscricao/${inscricao._id}/comprovante`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                                .then(response => {
                                    this.handlePagSeguro(inscricao._id);
                                });

                        } else {
                            this.handlePagSeguro(inscricao._id);
                        }
                    });
            }
        }
    }
</script>