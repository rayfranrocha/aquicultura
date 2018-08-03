/*---- Variáveis para controle de preço ----*/
var total = 0.0;
var precoInscricao = 0.0;
var precoMinicurso = 50.0;
var pagarLocal = false;
var participaMinicurso = false;
var escolhaMinicurso = null;
/*-----------------------------------------*/
/*---- Variáveis para controle do DOM ----*/
var passoAtual = 1;
var elementoEsconder;
var elementoMostrar;
var erro;
var login = "";
var checkboxes = [];
/*-----------------------------------------*/
$(document).ready(function () {
    erro = document.getElementById('erro');
    /* Chama essas funções para caso a página foi atualizada enquanto preenchia dados 
    ou iniciando pela primeira vez*/
    recuperarVagas();
    verificarEAtualizarTextoTipoInscricao();
    trocarPagamento();
    recuperarLogin();
    mostrarTabelaMinicursos();
    inicializarForm();
});
function inicializarForm() {
    checkboxes = document.getElementsByClassName('checkboxMinicurso');
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
}
/*---- Função para ir ao próximo passo ---- */
function proximo(event) {
    event.preventDefault();
    if (passoAtual < 4) {
        location.href = "#form";
        esconderEMostrar('passo' + passoAtual, 'passo' + (passoAtual + 1));
        passoAtual = passoAtual + 1;
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO " + passoAtual + " DE 4";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
        if (passoAtual == 4) {
            document.getElementById('btProximo').innerText = "Concluir";
        }
    } else if (passoAtual === 4) { /* Chama a última função para concluir compra */
        concluirCompra();
        if (tipoPagamento == 2) {
            showMensagemFinal("Obrigado pela sua inscrição! Efetue o pagamento no local do evento");
        } else {
            showMensagemFinal("Obrigado pela sua inscrição! Clique no botão do PagSeguro para concluir a compra");
        }
    }
}
/*---- Função para retornar ao passo anterior ---- */
function anterior() {
    if (passoAtual > 1) {
        location.href = "#form";
        document.getElementById('btProximo').innerText = "Próximo";
        esconderEMostrar('passo' + passoAtual, 'passo' + (passoAtual - 1));
        passoAtual--;
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO " + passoAtual + " DE 4";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
    }
}
/*---- Função para mostrar elemento no DOM a partir de uma condição ----*/
function mostrarAPartirDeBool(idElemento, condicao) {
    var elemento = document.getElementById(idElemento);
    if (condicao) {
        elemento.classList.remove('out');
        elemento.classList.add('in');
        elemento.style.display = 'block';
    } else {
        elemento.classList.add('out');
        elemento.classList.remove('in');
        elemento.style.display = 'none';
    }
}
/*---- Função para esconder e mostrar elementos no DOM ---- */
function esconderEMostrar(esconder__, mostrar__) {
    elementoEsconder = document.getElementById(esconder__);
    elementoMostrar = document.getElementById(mostrar__);
    elementoEsconder.classList.add('out');
    elementoEsconder.classList.remove('in');
    // Code for Chrome, Safari and Opera
    elementoEsconder.addEventListener("webkitAnimationEnd", function () {
        elementoEsconder.style.display = "none";
        elementoMostrar.classList.add('in');
        elementoMostrar.classList.remove('out');
        elementoMostrar.style.display = "block";
    });
    elementoEsconder.addEventListener("animationend", function () {
        elementoEsconder.style.display = "none";
        elementoMostrar.classList.add('in');
        elementoMostrar.classList.remove('out');
        elementoMostrar.style.display = "block";
    });
}
function recuperarLogin() {
    var db = new Dexie("dbusuario");
    db.open().then(function (db_) {
        const user = db_.table('user');
        user.get('1').then(function (res) {
            if (res && res.cpf) {
                login = res.cpf;
            }
        });
    }).catch(function (e) {
        console.error("Open failed: " + e);
    });
}
function recuperarVagas() {
    var elementos_ = document.getElementsByClassName("vagaMinicurso");
    var mapaMinicursos = {};
    /* mapaMinicursos = {
        "1": <td class="vagaMinicurso"></td>
        "2": <td class="vagaMinicurso"></td>
        "3": <td class="vagaMinicurso"></td>
    } */
    /* Guarda o nome dos minicursos */
    for (var i = 0; i < elementos_.length; i++) {
        (function (index) {
            mapaMinicursos[(index + 1)] = elementos_[index];
        })(i);
    }
    var resposta = {
        "1": 31,
        "2": 40,
        "3": 20
    }
    for (var chave in resposta) {
        if (resposta.hasOwnProperty(chave)) {
            var valor = resposta[chave];
            if (mapaMinicursos[chave]) {
                mapaMinicursos[chave].innerText = valor;
            }
        }
    }
}
/*---- Função para mostrar mensagem final---- */
function showMensagemFinal(texto) {
    esconderEMostrar('passo4', 'conclusao');
    var mensagem = document.getElementById('textoConclusao');
    mensagem.innerText = texto;
}
/*---- Função para concluir compra ----*/
function concluirCompra() {
    var nome = document.getElementById('nome').value,
        empresa = document.getElementById('empresa').value,
        sexo = document.getElementById('sexo').value,
        telefone = document.getElementById('telefone').value,
        nome_boleto = document.getElementById('nome_boleto').value,
        cpf_cnpj = document.getElementById('cpf_cnpj').value,
        endereco = document.getElementById('endereco').value,
        tipoInscricao = document.getElementById('tipoInscricao').value,
        tipoPagamento = document.getElementById('tipoPagamento').value,
        participanteMinicurso = document.getElementById('participar_minicurso').checked;
    var objetoInscricao = {
        "nomeCracha": nome,
        "empresa": empresa,
        "sexo": sexo,
        "telefone": telefone,
        "nomeBoleto": nome_boleto,
        "cpfCnpj": cpf_cnpj,
        "endereco": endereco,
        "tipoInscricao": tipoInscricao,
        "tipoPagamento": tipoPagamento,
        "minicurso": null
    };
    if (participanteMinicurso && escolhaMinicurso != null) {
        objetoInscricao.minicurso = escolhaMinicurso;
    }
    var envio = {
        "login": login,
        "infoExtra": objetoInscricao
    };
    if (tipoPagamento == 1) {
        mostrarAPartirDeBool('pagamentoPagSeguro', true);
        document.getElementById('anterior').style.display = 'none';
        document.getElementById('proximo').style.display = 'none';
    };
    // $.ajax({
    //     type: "POST",
    //     crossDomain: true,
    //     contentType: "application/json",
    //     dataType: 'json',
    //     data: JSON.stringify(envio),
    //     url: baseUrl + "/usuario/inscricao/222",
    //     success: function (response) {
    //         var resposta = response;
    //         if (erro && resposta && (resposta.erro !== null)) {
    //             erro.style.display = 'block';
    //             erro.innerText = resposta.erro;
    //             erro.style.color = 'red';
    //         } else if (resposta) {

    //         }
    //     },
    //     error: function (jqXHR, textStatus, error) {
    //         console.log(jqXHR, textStatus, error);
    //     }
    // });

}
/*---- Função para trocar tipo de pagamento e mostrar no DOM ----*/
function trocarPagamento(evento) {
    var valor;
    if (evento) {
        valor = +evento.target.value;
    }
    else {
        valor = (+document.getElementById('tipoPagamento').value);
    }
    if (valor === 2) {
        pagarLocal = true;
    } else {
        pagarLocal = false;
    }
    atualizarTotalAPagar();
}
/*--- Função que atualiza o innerText quando o tipo muda ou página atualiza ---*/
function verificarEAtualizarTextoTipoInscricao(tipo) {
    var dataBase = new Date();
    dataBase.setDate(21);
    dataBase.setMonth(8);
    var dataAtual = new Date();
    var preco = document.getElementById("precoInscricao");
    var tipo_ = tipo || (+document.getElementById('tipoPagamento').value);
    switch (tipo_) {
        case 1:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 50,00";
                precoInscricao = 50.0;
            } else {
                preco.innerText = "R$ 70,00";
                precoInscricao = 70.0;
            }
            break;
        case 2:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 70,00";
                precoInscricao = 70.0;
            } else {
                preco.innerText = "R$ 100,00";
                precoInscricao = 100.0;
            }
            break;
        case 3:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 150,00";
                precoInscricao = 150.0;
            } else {
                preco.innerText = "R$ 200,00";
                precoInscricao = 200.0;
            }
            break;
        case 4: /* Participa apenas de minicurso */
            precoInscricao = 0.0;
            break;
        default:
            break;
    }
}
/*---- Função para trocar tipo de inscrição e mostrar no DOM ----*/
function trocarTipoInscricao(evento) {
    var tipo_ = +evento.target.value;
    verificarEAtualizarTextoTipoInscricao(tipo_);
    atualizarTotalAPagar();
}
/*---- Função para mostrar a tabela de minicursos caso necessário ----*/
function mostrarTabelaMinicursos(evento) {
    if (evento) {
        participaMinicurso = evento.target.checked;
        mostrarAPartirDeBool('tabelaMinicursos', participaMinicurso);
    } else {

        var checkbox = document.getElementById('participar_minicurso');
        var checked_ = checkbox.checked;
        mostrarAPartirDeBool('tabelaMinicursos', checked_);
    }
}
/*---- Função para confirmar inscrição em minicurso e lógica para escolha de minicurso----*/
function incluirMinicurso(evento) {
    var minicursoAtual = evento.target.parentNode.nextElementSibling.innerText;
    var checked_ = evento.target.checked;

    /*Algoritmo para desmarcar outras checkbox */
    var checkboxAtual = evento.target;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkboxAtual) {
            checkboxes[i].checked = false;
        }
    }
    /*Lógica para incluir preço no total a pagar */

    if (checked_ && minicursoAtual !== escolhaMinicurso) {
        document.getElementById('precoMinicurso').innerText = "R$ 50,00";
        escolhaMinicurso = minicursoAtual;
    } else if (!checked_ && minicursoAtual === escolhaMinicurso) {
        document.getElementById('precoMinicurso').innerText = "R$ 0,00";
        escolhaMinicurso = "";
    }

    precoMinicurso = escolhaMinicurso != "" ? 50.0 : 0.0;
    atualizarTotalAPagar();
}
/*---- Função para atualizar total a pagar e mostrar no DOM ----*/
function atualizarTotalAPagar() {
    total = 0.0;
    if (participaMinicurso && !pagarLocal) {
        total = precoInscricao + precoMinicurso;
        document.getElementById('precoTotal').innerText = numberParaReal(total);
    } else if (!pagarLocal) {
        total = precoInscricao;
        document.getElementById('precoTotal').innerText = numberParaReal(total);
    } else {
        document.getElementById('precoTotal').innerText = "R$ 0,00 (Pagamento no local)";
    }
}
/*---- Função para converter valor para modelo da moeda Real ----*/
function numberParaReal(numero) {
    var numero__ = numero.toFixed(2).split('.');
    numero__[0] = "R$  " + numero__[0].split(/(?=(?:...)*$)/).join('.');
    return numero__.join(',');
}
