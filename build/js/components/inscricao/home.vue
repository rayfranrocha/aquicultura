<template>
    <div>
        <div class="container card">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">INSCRIÇÕES</h1>
            <hr class="small">
            <div class="table-head u-margin-top-small">
                <h3>Tabela de Preços</h3>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Categoria</th>
                        <th scope="col">Até 21/09</th>
                        <th scope="col">21/10 a 02/11</th>
                        <th scope="col">Local</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Estudante de cursos técnicos ou graduação</td>
                        <td>R$50,00</td>
                        <td>R$70,00</td>
                        <td>R$100,00</td>
                    </tr>
                    <tr>
                        <td>Estudante de pós graduação</td>
                        <td>R$70,00</td>
                        <td>R$100,00</td>
                        <td>R$130,00</td>
                    </tr>
                    <tr>
                        <td>Profissional</td>
                        <td>R$150,00</td>
                        <td>R$200,00</td>
                        <td>R$250,00</td>
                    </tr>
                    <tr>
                        <td>
                            Minicursos
                        </td>
                        <td>R$50,00</td>
                        <td>R$50,00</td>
                        <td>R$50,00</td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container card">

            <div class="formulario-contato">
                <form onsubmit="proximo(event);" id="form" method="post">
                    <fieldset>
                        <div class="row">
                            <h2 id="textoPassoAtual" class="heading-secondary no-hover u-center-text-2">PASSO 1 DE 4</h2>
                            <hr class="small">
                            <div id="passo1" class="passo-1 col-md-12 col-sm-12 col-xs-12">
                                <h2 class="heading-secondary no-hover u-center-text-2">Dados para cadastro</h2>
                                <label for="nome">Nome para o crachá*:</label>
                                <input type="text" id="nome" name="nome">
                                <label for="empresa">Empresa/Instituição*:</label>
                                <input type="text" id="empresa" name="empresa">
                                <label for="sexo">Sexo*:</label>
                                <input type="text" id="sexo" name="sexo">
                                <label for="telefone">Telefone*:</label>
                                <input type="tel" id="telefone" name="telefone">
                            </div>
                            <div id="passo2" class="passo-2 col-md-12 col-sm-12 col-xs-12">
                                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Dados para boleto/recibo</h1>
                                <label for="nome_boleto">Nome*:</label>
                                <input type="text" id="nome_boleto" name="nome_boleto">
                                <label for="cpf_cnpj">CPF/CNPJ*:</label>
                                <input type="text" id="cpf_cnpj" name="cpf_cnpj">
                                <label for="endereco">Endereço*:</label>
                                <input type="text" id="endereco" name="endereco">
                            </div>
                            <div id="passo3" class="passo-4 col-md-12 col-sm-12 col-xs-12">
                                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Anexo para comprovação do tipo de inscrição</h1>
                                <input class="form-control" style="margin: 3rem 0;" type="file" name="arquivo" id="arquivo">
                            </div>
                            <div id="passo4" class="passo-3 col-md-12 col-sm-12 col-xs-12">
                                <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Inscrição minicursos e pagamento</h1>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="tipoInscricao">Tipo</label>
                                    </div>
                                    <select class="custom-select" onchange="trocarTipoInscricao(event);" id="tipoInscricao">
                                        <option selected>Escolha um tipo de inscrição...</option>
                                        <option value="1">Estudante de curso técnico ou Graduação</option>
                                        <option value="2">Estudante de Pós-Graduação</option>
                                        <option value="3">Profissional</option>
                                        <option value="4">Participação apenas do minicurso</option>
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="tipoPagamento">Pagamento</label>
                                    </div>
                                    <select onchange="trocarPagamento(event);" class="custom-select" id="tipoPagamento">
                                        <option selected>Escolha um modo de pagamento...</option>
                                        <option value="1">Cartão/Boleto</option>
                                        <option value="2">Pagamento Local</option>
                                    </select>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" checked="false" class="form-check-input" onchange="mostrarTabelaMinicursos(event);" id="participar_minicurso">
                                    <label class="form-check-label" for="participar_minicurso">Quero participar de minicursos</label>
                                </div>
                                <div class="form-group" id="tabelaMinicursos">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Desejo Participar</th>
                                                <th>Minicurso</th>
                                                <th>Vagas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" onchange="incluirMinicurso(event)" class="checkboxMinicurso">
                                                </td>
                                                <td>Metodologia Científica</td>
                                                <td class="vagaMinicurso">100</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="checkboxMinicurso" type="checkbox" onchange="incluirMinicurso(event)">
                                                </td>
                                                <td>Nutrição e Saúde</td>
                                                <td class="vagaMinicurso">50</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="checkboxMinicurso" onchange="incluirMinicurso(event)" class="m3">
                                                </td>
                                                <td>Doenças na Aquicultura</td>
                                                <td class="vagaMinicurso">50</td>
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
                                            <td id="precoMinicurso">R$ 0,00</td>
                                        </tr>
                                        <tr>
                                            <td>Inscrição</td>
                                            <td id="precoInscricao">R$ 0,00</td>
                                        </tr>
                                        <tr>
                                            <td>Total A Pagar</td>
                                            <td id="precoTotal">R$ 0,00</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div id="conclusao" class="col-md-12 col-sm-12 col-xs-12">
                                <h1 id="textoConclusao" class="heading-secondary no-hover u-center-text-2"></h1>
                            </div>
                            <span id="erro" style="display: none; width: 100%;"></span>
                        </div>
                    </fieldset>

                    <div class="row" id="botoesDiv">
                        <div class="col" id="anterior">
                            <button onclick="anterior();" id="btAnterior" class="bt-flat-azul" type="button">Anterior</button>
                        </div>
                        <div class="col" id="proximo">
                            <button id="btProximo" class="bt-flat-azul" type="submit">Próximo</button>
                        </div>
                    </div>
                </form>
                <div id="pagamentoPagSeguro" class="col-md-12 col-sm-12 col-xs-12">
                    <form action="https://pagseguro.uol.com.br/checkout/v2/payment.html" method="post">
                        <input type="hidden" name="code" value="3D636A46EFEF0B5554F5EF98F924011A" />
                        <input type="hidden" name="iot" value="button" />
                        <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/209x48-comprar-assina.gif" name="submit"
                            alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
