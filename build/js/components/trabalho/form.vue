<template>
    <div>
        <section id="enviarTrabalho" class="enviar-trabalhos">
            <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Novo Trabalho</h1>
                <hr class="small">
                <div class="container formulario-trabalho">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                            <form @submit.prevent="submeter()" method="post">
                                <fieldset>
                                    <label for="tituloTrabalho">Título*:</label>
                                    <input v-model="trabalho.titulo" required type="text" id="tituloTrabalho" name="tituloTrabalho">
                                    <label for="nomes">Nome dos Autores*:</label>
                                    <input v-model="trabalho.autores" required type="text" id="nomes" name="nomes">
                                    <label for="emails">Email dos Autores*:</label>
                                    <input v-model="trabalho.emailAutores" required type="text" id="emails" name="emails">
                                    <label for="resumo">Resumo*:</label>
                                    <textarea v-model="trabalho.resumo" required rows="5" id="resumo"></textarea>
                                    <label for="abstract">Abstract*:</label>
                                    <textarea v-model="trabalho.abstract" required rows="5" id="abstract"></textarea>
                                    <label for="arquivo">Arquivo</label>
                                    <input class="form-control" type="file" name="arquivo" id="arquivo" accept="application/pdf">
                                </fieldset>
                                <span id="status-trabalho" class="u-margin-top-small"></span>
                                <button class="u-margin-top-small bt-flat-azul" type="submit">Submeter Trabalho</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
module.exports = {
  mounted() {
      jQuery('#tituloTrabalho').focus();
  },
  data () {
      return {
          trabalho: {}
      }
  },
  methods: {
      submeter () {
          var formData = new FormData();
          formData.append("titulo", this.trabalho.titulo)
          formData.append("autores", this.trabalho.autores);
          formData.append("emailAutores", this.trabalho.emailAutores);
          formData.append("resumo", this.trabalho.resumo);
          formData.append("abstract", this.trabalho.abstract);
          formData.append("user", window.localStorage.getItem("user"));

          var arquivo = document.querySelector('#arquivo');
          if (arquivo) {
              formData.append("file", arquivo.files[0]);
          }

          axios.post('/trabalho', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                window.location.href = "index.html";
            });
      }
  }
}
</script>
