<template>
    <div>
        <form @submit.prevent="pagar()" id="form" method="post">
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
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="tipoPagamento">Pagamento *</label>
                            </div>
                            <select required v-model="dadosInscricao.formaPagamento" class="custom-select" id="tipoPagamento">
                                <option :value="null" selected>Escolha um modo de pagamento...</option>
                                <option value="PAGSEGURO">Cartão</option>
                                <option value="NO_LOCAL">Pagamento Local</option>
                            </select>
                        </div>
                        <div v-if="dadosInscricao.tipoInscricao !== 'MINI_CURSO'" class="form-group form-check">
                            <input v-model="participaMinicurso" type="checkbox" class="form-check-input" id="participar_minicurso">
                            <label class="form-check-label" for="participar_minicurso">Quero participar de minicursos</label>
                        </div>
                        <div v-if="participaMinicurso || dadosInscricao.tipoInscricao === 'MINI_CURSO'" class="form-group">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Desejo Participar</th>
                                        <th>Minicurso</th>
                                        <th>Vagas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(minicurso, index) in listMinicurso" :key="minicurso._id">
                                        <td>
                                            <input required type="radio" name="minicursoSelected" v-model="minicursoSelected" :value="index" class="checkboxMinicurso">
                                        </td>
                                        <td>{{minicurso.nome}}</td>
                                        <td class="vagaMinicurso">{{minicurso.vagas}}/{{minicurso.disponiveis}}</td>
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
                                    <td>Minicursos</td>
                                    <td id="precoMinicurso">{{formataMoney(valorMinicurso)}}</td>
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
                    <button type="submit" class="bt-flat-azul">Realizar pagamento</button>
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
            return this.valorInscricao + this.valorMinicurso
        },
        minicursoSelected () {
            return this.minicursoSelected
        },
        tipoInscricao () {
            return this.dadosInscricao.tipoInscricao
        }
    },
    created () {
        axios.get('/vaga')
            .then(response => this.listMinicurso = response.data)
    },
    data: function () {
        return {
            listMinicurso: [],
            minicursoSelected: null,
            dadosInscricao: {
                tipoInscricao: null,
                formaPagamento: null,
                minicurso: null
            },
            participaMinicurso: false,
            valorInscricao: 0,
            valorMinicurso: 0
        }
    },
    watch: {
        minicursoSelected: function(newValue) {
            if (newValue || newValue === 0) {
                this.dadosInscricao.minicurso = this.listMinicurso[newValue];
                console.log('Minicurso', this.dadosInscricao.minicurso)
                this.valorMinicurso = this.dadosInscricao.minicurso.preco;
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
        pagar () {
            this.dadosInscricao.totalAPagar = this.valorTotal;
            this.dadosInscricao.valorInscricao = this.valorInscricao;
            
            if (this.dadosInscricao.minicurso) {
                var formData = new FormData();
                
                var arquivo = document.querySelector('#arquivo');
                formData.append("file", arquivo.files[0]);

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
                                            this.dadosInscricao.pagseguro.transactionCode = transactionCode
                                            axios.put(`/inscricao/${this.id}`, this.dadosInscricao)
                                                .then(reponse => {

                                                });
                                        },
                                        abort: function() {
                                        }
                                    });
                                });
                        }); 
                    });
            } else {
                axios.put(`/inscricao/${this.id}`, this.dadosInscricao)
                .then(response => {
                    axios.post('/pagseguro', {id: this.id})
                        .then(response => {
                            console.log('Pagesguro response', response.data)

                            PagSeguroLightbox({
                                code: response.data.checkout.code[0],
                                iot: 'button'
                            }, {
                                success: function(transactionCode) {
                                    console.log(transactionCode)
                                    this.dadosInscricao.pagseguro.transactionCode = transactionCode
                                    axios.put(`/inscricao/${this.id}`, this.dadosInscricao)
                                        .then(reponse => {

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