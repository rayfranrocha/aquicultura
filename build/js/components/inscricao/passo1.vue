<template>
    <div>
        <form @submit.prevent="proximo()" id="form" method="post">
            <fieldset>
                <div class="row">
                    <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 1 DE 3</h2>
                    <hr class="small">
                    
                    <div id="passo1" class="passo-1 col-md-12 col-sm-12 col-xs-12">
                        <h2 class="heading-secondary no-hover u-center-text-2">Dados para cadastro</h2>
                        <label for="nome">Nome para o crachá*:</label>
                        <input required type="text" id="nome" name="nome" v-model="dadosInscricao.nomeCracha">
                        <label for="empresa">Empresa/Instituição*:</label>
                        <input required type="text" id="empresa" name="empresa" v-model="dadosInscricao.empresa">
                        <label for="sexo">Sexo*:</label>
                        <input required type="text" id="sexo" name="sexo" v-model="dadosInscricao.sexo">
                        <label for="telefone">Telefone Celular*:</label>
                        <input required type="tel" id="telefone" name="telefone" v-model="dadosInscricao.telefone">
                    </div>

                </div>
            </fieldset>

            <div class="row" id="botoesDiv">
                <div class="col" id="proximo">
                    <button type="submit" id="btProximo" class="bt-flat-azul">Próximo</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
module.exports = {
    mounted() {
        jQuery('#telefone').mask('(00) 00000-0000');
        jQuery('#nome').focus();
    },
    data: function() {
        return {
            dadosInscricao: {}
        }
    },
    methods: {
        proximo () {
            this.dadosInscricao.user = window.localStorage.getItem("user");
            this.dadosInscricao.telefone = this.dadosInscricao.telefone.replace(/[ \-()]/g,'');
            axios.post('/inscricao', this.dadosInscricao)
                .then(response => {
                    this.$store.dispatch('setIdInscricao', response.data._id);
                    this.$router.push({name: 'passo2'});
                })
        }
    }
}
</script>
