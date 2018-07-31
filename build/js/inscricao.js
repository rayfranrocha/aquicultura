/*---- Variáveis para controle de preço ----*/
var total = 0.0;
var inscricao = 0.0;
var minicurso = 50.0;
var pagarLocal = false;
var participaMinicurso = false;
/*-----------------------------------------*/
/*---- Variáveis para controle do DOM ----*/
var passoAtual = 1;
var elementoEsconder;
var elementoMostrar;
var erro;
/*-----------------------------------------*/
$(document).ready(function () {
    erro = document.getElementById('erro');
});
/*---- Função para ir ao próximo passo ---- */
function proximo(event) {
    event.preventDefault();
    if (passoAtual < 3) {
        location.href = "#form";
        esconderEMostrar('passo' + passoAtual, 'passo' + (passoAtual + 1));
        passoAtual = passoAtual + 1;
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO " + passoAtual + " DE 3";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
        if (passoAtual == 3) {
            document.getElementById('btProximo').innerText = "Concluir";
        }
    } else if (passoAtual === 3) { /* Chama a última função para concluir compra */
        concluirCompra();
        if (tipoPagamento == 1 || tipoPagamento == 2) {
            showMensagemFinal("Obrigado pela sua inscrição! Aguarde o envio de boleto/recibo para seu email");
        } else {
            showMensagemFinal("Obrigado pela sua inscrição!");
        }
    }
}
/*---- Função para retornar ao passo anterior ---- */
function anterior() {
    if (passoAtual > 1) {
        location.href = "#form";

        document.getElementById('btProximo').innerText = "Próximo";
        elementoEsconder = document.getElementById('passo' + passoAtual);
        elementoMostrar = document.getElementById('passo' + (passoAtual - 1));
        passoAtual--;
        elementoEsconder.classList.add('out');
        elementoEsconder.classList.remove('in');
        // Code for Chrome, Safari and Opera
        elementoEsconder.addEventListener("webkitAnimationEnd", function () {
            elementoEsconder.style.display = "none";
            elementoMostrar.classList.add('in');
            elementoMostrar.classList.remove('out');
            elementoMostrar.style.display = "block";
        });
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO " + passoAtual + " DE 3";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
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
/*---- Função para mostrar mensagem final---- */
function showMensagemFinal(texto) {
    esconderEMostrar('passo3', 'conclusao');
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
        "participanteMinicurso": participanteMinicurso
    };
    // $.ajax({
    //     type: "post",
    //     crossDomain: true,
    //     contentType: "application/json",
    //     dataType: 'json',
    //     data: JSON.stringify(objetoInscricao),
    //     url: baseUrl + "/usuario/inscricao/222",
    //     success: function (response) {
    //         var resposta = response;
    //         console.log(resposta);
    //         if (erro && resposta && (resposta.erro !== null)) {
    //             erro.style.display = 'block';
    //             erro.innerText = resposta.erro;
    //             erro.style.color = 'red';
    //         }
    //     },
    //     error: function(jqXHR, textStatus, error){
    //         console.log(jqXHR,textStatus,error);
    //     }
    // });
}
/*---- Função para trocar tipo de pagamento e mostrar no DOM ----*/
function trocarPagamento(evento) {
    var valor = +evento.target.value;
    console.log(valor);
    if (valor === 3) {
        pagarLocal = true;
        atualizarTotalAPagar();
    } else {
        pagarLocal = false;
        atualizarTotalAPagar();
    }
}
/*---- Função para trocar tipo de inscrição e mostrar no DOM ----*/
function trocarTipoInscricao(evento) {
    var dataBase = new Date();
    dataBase.setDate(21);
    dataBase.setMonth(8);
    var dataAtual = new Date();
    var tipo_ = +evento.target.value;
    var preco = document.getElementById("precoInscricao");
    switch (tipo_) {
        case 1:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 50,00";
                inscricao = 50.0;
            } else {
                preco.innerText = "R$ 70,00";
                inscricao = 70.0;
            }
            break;
        case 2:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 70,00";
                inscricao = 70.0;
            } else {
                preco.innerText = "R$ 100,00";
                inscricao = 100.0;
            }
            break;
        case 3:
            if (dataAtual < dataBase) {
                preco.innerText = "R$ 150,00";
                inscricao = 150.0;
            } else {
                preco.innerText = "R$ 200,00";
                inscricao = 200.0;
            }
            break;
        default:
            break;
    }
    atualizarTotalAPagar();
}
/*---- Função para confirmar inscrição em minicurso ----*/
function incluirMinicurso(evento) {
    if (evento.target.checked) {
        document.getElementById('precoMinicurso').innerText = "R$ 50,00";
    } else {
        document.getElementById('precoMinicurso').innerText = "R$ 0,00";
    }
    participaMinicurso = evento.target.checked;
    atualizarTotalAPagar();
}
/*---- Função para atualizar total a pagar e mostrar no DOM ----*/
function atualizarTotalAPagar() {
    total = 0.0;
    if (participaMinicurso && !pagarLocal) {
        total = inscricao + minicurso;
        document.getElementById('precoTotal').innerText = numberParaReal(total);
    } else if (!pagarLocal) {
        total = inscricao;
        document.getElementById('precoTotal').innerText = numberParaReal(total);
    } else {
        document.getElementById('precoTotal').innerText = "R$ 0,00 (Pagamento no local)";
    }
}
/*---- Função para converter valor para modelo da moeda Real ----*/
function numberParaReal(numero) {
    var numero__ = numero.toFixed(2).split('.');
    numero__[0] = "R$ " + numero__[0].split(/(?=(?:...)*$)/).join('.');
    return numero__.join(',');
}