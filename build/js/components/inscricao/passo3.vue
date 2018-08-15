<template>
    <div>
        <fieldset>
            <div class="row">
                <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 3 DE 4</h2>
                <hr class="small">
                
                <div class="passo-4 col-md-12 col-sm-12 col-xs-12">
                    <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Anexo para comprovação do tipo de inscrição</h1>
                    <input class="form-control" style="margin: 3rem 0;" type="file" name="arquivo" id="arquivo">
                </div>

            </div>
        </fieldset>

        <div class="row" id="botoesDiv">
            <div class="col" id="anterior">
                <button @click.prevent="anterior()" id="btAnterior" class="bt-flat-azul" type="button">Anterior</button>
            </div>
            <div class="col" id="proximo">
                <button @click.prevent="proximo()" id="btProximo" class="bt-flat-azul">Próximo</button>
            </div>
        </div>
        
    </div>
</template>
<script>
module.exports = {
    methods: {
        anterior () {
            this.$router.push({name: 'passo2'})
        },

        proximo () {
            this.$router.push({name: 'passo4'})
        }
    }
}
</script>