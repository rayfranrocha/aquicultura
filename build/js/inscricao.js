var passoAtual = 1;
var elementoEsconder;
var elementoMostrar;
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
function esconderEMostrar(esconder__,mostrar__){
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
    elementoEsconder.addEventListener("animationend",function(){
        elementoEsconder.style.display = "none";
        elementoMostrar.classList.add('in');
        elementoMostrar.classList.remove('out');
        elementoMostrar.style.display = "block";
    });
}
function showMensagemFinal(texto){
    esconderEMostrar('passo3','conclusao');
    var mensagem = document.getElementById('textoConclusao');
    mensagem.innerText = texto;

}
function proximo(event) {
    event.preventDefault();
    if (passoAtual < 3) {
        location.href = "#form";
        esconderEMostrar('passo'+passoAtual,'passo'+(passoAtual+1));
        passoAtual = passoAtual + 1;
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO " + passoAtual + " DE 3";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
        if (passoAtual == 3) {
            document.getElementById('btProximo').innerText = "Concluir";
        }
    } else if (passoAtual === 3) {
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
        JSON.stringify(objetoInscricao);
        showMensagemFinal("Obrigado pela sua inscrição! Aguarde a emissão do boleto");
    }
}
var total = 0.0;
var inscricao = 0.0;
var minicurso = 50.0;
var pagarLocal = false;
var participaMinicurso = false;
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
function trocarTipo(evento) {
    var dataBase = new Date();
    dataBase.setDate(21);
    dataBase.setMonth(8);
    var dataAtual = new Date();
    var valor = +evento.target.value;
    var preco = document.getElementById("precoInscricao");
    switch (valor) {
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
function incluirMinicurso(evento) {
    if (evento.target.checked) {
        document.getElementById('precoMinicurso').innerText = "R$ 50,00";
    } else {
        document.getElementById('precoMinicurso').innerText = "R$ 0,00";
    }
    participaMinicurso = evento.target.checked;
    atualizarTotalAPagar();
}
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
function numberParaReal(numero) {
    var numero__ = numero.toFixed(2).split('.');
    numero__[0] = "R$ " + numero__[0].split(/(?=(?:...)*$)/).join('.');
    return numero__.join(',');
}
