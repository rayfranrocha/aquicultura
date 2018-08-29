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
        computed: {
            valorTotal () {
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