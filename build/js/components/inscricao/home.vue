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
                        <th scope="col">21/09 a 02/11</th>
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
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
