<template>
    <div>
        <div class="container card">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Minhas Compras realizadas</h1>
            <hr class="small">
            <div class="card-body text-center">
                <p>Ainda não há itens comprados</p>
            </div>
        </div>
        <div class="container card">
            <h1 class="heading-secondary no-hover u-center-text-2 u-margin-top-small">Produtos Disponíveis</h1>
            <hr class="small">
            <div class="card-body text-center">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <router-link tag="a" class="btn btn-primary"
                                :to="{name: 'inscricao'}">
                                <i class="fas fa-address-card"></i>
                                Inscrição no Evento
                            </router-link>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary">
                                <i class="fas fa-chalkboard-teacher"></i>
                                Inscrição no Minicurso Grupo 1
                            </button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary">
                                <i class="fas fa-chalkboard-teacher"></i>
                                Inscrição no Minicurso Grupo 2
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
