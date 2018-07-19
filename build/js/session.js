var sessao;
$(document).ready(function () {
    var db = new Dexie("dbusuario");
    var userSession = {};
    db.version(1).stores({
        user: '&id,cpf,email'
    });
    db.open().catch(function (err) {
        console.error('Failed to open db: ' + (err.stack || err));
    });
    db.user.get('1').then((res) => {
        if (res === undefined) {
            db.user.put({ id: '1', isLogado: false, nome: '', cpf: '', email: '' }).then(() => {
                console.log('Criado');
                userSession = { id: '1', isLogado: false, nome: '', cpf: '', email: '' };
            });
        } else {
            userSession = res;
        }
    }).catch((err) => {
        console.error('Failed to open db: ' + (err.stack || err));
    });
    function logar() {
        
    }
    function deslogar() {

    }
    function inscrever() {

    }
    function isLogado() {
        return userSession.isLogado;
    }
    sessao = (function () {
        return {
            logar: logar,
            isLogado: isLogado,
            deslogar: deslogar,
            inscrever: inscrever,
        }
    })();
});

function areaRestrita(redirecionar) {
    if (!sessao.isLogado()) {
        var location =  'file:///home/jeliel/Documentos/Trabalho/site-encontro-aquicultura/aquicultura/build';
        window.location.href = location + '/login.html';
    }else if(redirecionar === "login"){
        //Ir para área restrita
    }else if(redirecionar === "inscricao"){
        //Redirecionar para as inscrições
    }
}
function showCadastro(){
    var esconder = document.getElementById('login-form');
    esconder.classList.add('out');
    var mostrar = document.getElementById('cadastro-form');
    mostrar.classList.add('in');
    mostrar.style.display = 'block';
}
function cadastrar(event){
    event.preventDefault();
    var emailElement,senhaElement,confElement,cpfElement;
    var email,senha,confsenha,cpf;
    emailElement = document.getElementById('email');
    senhaElement = document.getElementById('senha');
    confElement = document.getElementById('confsenha');
    cpfElement = document.getElementById('cpf');
    email = emailElement.value;
    senha = senhaElement.value;
    confsenha = confElement.value;
    cpf = cpfElement.value;
    if(confsenha !== senha){
        confElement.style.borderColor = 'yellow';
        senhaElement.style.borderColor = 'yellow';
        var error = document.getElementById('erro_form');
        error.style.display = 'block';
        error.innerText = 'O campo confirmar senha está diferente do campo senha';
    }
    //Se tiver sucesso, redirecionar para área restrita.
}
