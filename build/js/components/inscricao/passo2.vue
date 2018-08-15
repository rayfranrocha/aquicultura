<template>
    <div>
        <fieldset>
            <div class="row">
                <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 2 DE 4</h2>
                <hr class="small">
                
                <div class="passo-2 col-md-12 col-sm-12 col-xs-12">
                    <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Dados para boleto/recibo</h1>
                    <label for="nome_boleto">Nome*:</label>
                    <input v-model="dadosBoleto.nome" type="text" id="nome_boleto" name="nome_boleto">
                    <label  for="cpf_cnpj">CPF/CNPJ*:</label>
                    <input v-model="dadosBoleto.cpfCnpj" type="text" id="cpf_cnpj" name="cpf_cnpj">
                    <label for="endereco">Endereço*:</label>
                    <input v-model="dadosBoleto.endereco" type="text" id="endereco" name="endereco">
                </div>

            </div>
        </fieldset>

        <div class="row" id="botoesDiv">
            <div class="col" id="anterior">
                <button @click.prevent="anterior()" id="btAnterior" class="bt-flat-azul" >Anterior</button>
            </div>
            <div class="col" id="proximo">
                <button @click.prevent="proximo()" id="btProximo" class="bt-flat-azul">Próximo</button>
            </div>
        </div>
        
    </div>
</template>
<script>
module.exports = {
    computed: {
        id () {
            return this.$store.getters.idInscricao
        }
    },
    data: function () {
        return {
            dadosBoleto: {}
        }
    },
    methods: {
        anterior () {
            this.$router.push({name: 'passo1'})
        },

        proximo () {
            axios.put(`/inscricao/${this.id}`, {dadosBoleto: this.dadosBoleto})
                .then(response => this.$router.push({name: 'passo3'}))
        }
    }
}
</script>

