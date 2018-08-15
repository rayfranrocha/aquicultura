<template>
    <div>
        <fieldset>
            <div class="row">
                <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 1 DE 4</h2>
                <hr class="small">
                
                <div id="passo1" class="passo-1 col-md-12 col-sm-12 col-xs-12">
                    <h2 class="heading-secondary no-hover u-center-text-2">Dados para cadastro</h2>
                    <label for="nome">Nome para o crachá*:</label>
                    <input type="text" id="nome" name="nome" v-model="dadosInscricao.nomeCracha">
                    <label for="empresa">Empresa/Instituição*:</label>
                    <input type="text" id="empresa" name="empresa" v-model="dadosInscricao.empresa">
                    <label for="sexo">Sexo*:</label>
                    <input type="text" id="sexo" name="sexo" v-model="dadosInscricao.sexo">
                    <label for="telefone">Telefone*:</label>
                    <input type="tel" id="telefone" name="telefone" v-model="dadosInscricao.telefone">
                </div>

            </div>
        </fieldset>

        <div class="row" id="botoesDiv">
            <div class="col" id="proximo">
                <button id="btProximo" class="bt-flat-azul" @click.prevent="proximo()">Próximo</button>
            </div>
        </div>
        
    </div>
</template>
<script>
module.exports = {
    data: function() {
        return {
            dadosInscricao: {}
        }
    },
    methods: {
        proximo () {
            this.dadosInscricao.user = window.localStorage.getItem("user")
            axios.post('http://localhost:5000/inscricao', this.dadosInscricao)
                .then(response => {
                    this.$store.dispatch('setIdInscricao', response.data._id);
                    this.$router.push({name: 'passo2'});
                })
        }
    }
}
</script>
