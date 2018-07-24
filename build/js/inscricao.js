var passoAtual = 1;
var elementoEsconder;
var elementoMostrar;
function anterior(){
    if(passoAtual > 1){
        location.href = "#form";

        document.getElementById('btProximo').innerText = "Próximo";
        elementoEsconder = document.getElementById('passo'+passoAtual);
        elementoMostrar = document.getElementById('passo'+(passoAtual-1));
        passoAtual--;
        elementoEsconder.classList.add('out');
        elementoEsconder.classList.remove('in');
        // Code for Chrome, Safari and Opera
        elementoEsconder.addEventListener("webkitAnimationEnd", function(){
            elementoEsconder.style.display = "none";
            elementoMostrar.classList.add('in');
            elementoMostrar.classList.remove('out');
            elementoMostrar.style.display = "block";
        });
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO "+passoAtual+ " DE 3";
        document.getElementById('textoPassoAtual').innerText = texto_atual;
    }
}
function proximo(event) {
    event.preventDefault();
    if(passoAtual < 3){
        location.href = "#form";

        elementoEsconder = document.getElementById('passo'+passoAtual);
        elementoMostrar = document.getElementById('passo'+(passoAtual+1));
        elementoEsconder.classList.add('out');
        elementoEsconder.classList.remove('in');
        // Code for Chrome, Safari and Opera
        elementoEsconder.addEventListener("webkitAnimationEnd", function(){
            elementoEsconder.style.display = "none";
            elementoMostrar.classList.add('in');
            elementoMostrar.classList.remove('out');
            elementoMostrar.style.display = "block";
        });
        passoAtual++;
        var texto_atual = document.getElementById('textoPassoAtual').innerText;
        texto_atual = "PASSO "+passoAtual+ " DE 3"
        document.getElementById('textoPassoAtual').innerText = texto_atual;
        if(passoAtual == 3){
            document.getElementById('btProximo').innerText = "Concluir";
        }
    }
}
