<template>
    <div>
        <section id="enviarTrabalho" class="enviar-trabalhos">
            <div class="card container">
                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Novo Trabalho</h1>
                <hr class="small">
                <div class="container formulario-trabalho">
                    <div class="row">
                        <div class="col">
                            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <strong>{{error.message}}</strong> 
                            </div>
                            
                            <script>
                              $(".alert").alert();
                            </script>
                        </div>
                    </div>
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
                                    <label for="emails">Instituição*:</label>
                                    <input v-model="trabalho.instituicao" required type="text" id="instituicao" name="instituicao">
                                    <label for="areaSubmissao">Área de Submissão*:</label>
                                    <select required name="areaSubmissao" id="areaSubmissao"
                                        v-model="trabalho.areaSubmissao">
                                        <option :value="null">Selecione</option>
                                        <option
                                            v-for="areaSubmissao in listAreaSubmissao"
                                            :key="areaSubmissao" :value="areaSubmissao" v-text="areaSubmissao"></option>
                                    </select>
                                    <label for="categoriaPremiacao">Categoria para Premiação*:</label>
                                    <select required name="categoriaPremiacao" id="categoriaPremiacao"
                                        v-model="trabalho.categoriaPremiacao">
                                        <option :value="null">Selecione</option>
                                        <option
                                            v-for="categoria in listCategoriaPremiacao"
                                            :key="categoria" :value="categoria" v-text="categoria"></option>
                                    </select>
                                    <label for="resumo">Resumo*:</label>
                                    <textarea v-model="trabalho.resumo" required rows="5" id="resumo"></textarea>
                                    <label for="abstract">Abstract*:</label>
                                    <textarea v-model="trabalho.abstract" required rows="5" id="abstract"></textarea>
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
          trabalho: {
              areaSubmissao: null,
              categoriaPremiacao: null
          },
          error: null,
          listAreaSubmissao: [
            "Fisiologia aplicada a aquicultura",
            "Nutrição de organismos aquáticos",
            "Piscicultura de água doce",
            "Ornamentais",
            "Sanidade",
            "Economia",
            "Melhoramento e genética",
            "Qualidade de água e toxicologia",
            "Tecnologia e processamento de pescado",
            "Aquicultura e meio ambiente",
            "Carcinocultura de água doce",
            "Reprodução e larvicultura",
            "Comportamento/bem estar",
            "Recursos Pesqueiros"
          ],
          listCategoriaPremiacao: [
            "Estudante de Curso Técnico ou Graduação",
            "Estudante de Pós-Graduação ou Profissionais da Área"
          ]
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
          formData.append("areaSubmissao", this.trabalho.areaSubmissao);
          formData.append("categoriaPremiacao", this.trabalho.categoriaPremiacao);

          var arquivo = document.querySelector('#arquivo');
          if (arquivo) {
              formData.append("file", arquivo.files[0]);
          }

          axios.post('/trabalho', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                window.location.href = "trabalhos.html#/list-trabalho";
            }).catch(error => {
                this.error = error.response.data;
            });
      }
  }
}
</script>
