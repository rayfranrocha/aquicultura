var sessao;
$(document).ready(function () {
    var db = new Dexie("dbusuario");
    var userSession = {};
    var userRedirect = {};
    db.version(1).stores({
        user: '&id,cpf,email',
        redirect: '&id'
    });
    db.open().catch(function (e) {
        console.error("Open failed: " + e);
    });
    /*---Get para objeto de redirecionar---*/
    db.redirect.get('1')
    .then((res)=>{
        if(res === undefined){
            db.redirect.put(objetoRedirect()).then(()=>{
                console.log('Criado redirect');
                userRedirect = objetoRedirect();
            });
        }else{
            userRedirect = res;
        }
    });
    /*---Get para objeto de sessão---*/
    db.user.get('1')
    .then((res) => {
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
    function logar(dados,callback) {
        db.user.put({ id: '1', isLogado: true, nome: dados.nome, cpf: dados.cpf, email: dados.email }).then(() => {
            userSession = { id: '1', isLogado: true, nome: dados.nome, cpf: dados.cpf, email: dados.email};
        })
        .then(()=>{
            if(callback){
                callback();
            }
        })
    }
    function deslogar(callback) {
        db.user.put({id: '1',isLogado: false,nome:'',cpf:'',email: ''})
        .then(()=>{
            if(callback){
                callback();
            }
        });
    }
    function getDados() {
        return userSession;
    }
    function setRed(red){
        db.redirect.put({id:'1',redirect:red}).then(()=>{});
    }
    function getRed(){
        return userRedirect;
    }
    function isLogado() {
        return userSession.isLogado;
    }
    sessao = (function () {
        return {
            logar: logar,
            isLogado: isLogado,
            deslogar: deslogar,
            getDados: getDados,
            setRed: setRed,
            getRed: getRed
        }
    })();
});
function objetoRedirect(){
    return {id:'1',redirect:''}
}
function areaRestrita(redirecionar) {
    if (sessao.isLogado()) {
        if(redirecionar === "inscricao"){
        
        }
        else if(redirecionar === "trabalhos"){
            var location =  'file:///home/jeliel/Documentos/Trabalho/site-encontro-aquicultura/aquicultura/build';
            window.location.href = location + '/arearestrita.html';    
        }else{
            var location =  'file:///home/jeliel/Documentos/Trabalho/site-encontro-aquicultura/aquicultura/build';
            window.location.href = location + '/arearestrita.html';    
        }
    }else{
        sessao.setRed(redirecionar); //Guardar para onde o usuário queria ir
        var location =  'file:///home/jeliel/Documentos/Trabalho/site-encontro-aquicultura/aquicultura/build';
        window.location.href = location + '/login.html';
    }
}
function showCadastro(){
    var esconder = document.getElementById('login-form');
    esconder.classList.add('out');
    var mostrar = document.getElementById('cadastro-form');
    mostrar.classList.add('in');
    mostrar.style.display = 'block';
}
function logout(){
    sessao.deslogar(()=>{
        var location =  'file:///home/jeliel/Documentos/Trabalho/site-encontro-aquicultura/aquicultura/build';
        window.location.href = location + '/index.html';
    });
}
function login(event){
    event.preventDefault();
    var cpf, senha;
    senha = document.getElementById('senha').value;
    cpf = document.getElementById('cpf').value;
    //Chamar webservice com dados
    dados = {
        nome: 'Jeliel',
        cpf: '004.238.642-03',
        email: 'jeliel.augusto10@gmail.com'
    };
    sessao.logar(dados,()=>{ //callback para quando o login foi feito
        //Redirecionar para a página que o usuário queria acessar
        // sessao.getRed().then((res)=>{
        //     areaRestrita(res);
        // })
    });
}
function cadastrar(event,redirecionar){
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
    //Se tiver sucesso, redirecionar.
    /*
    if(ja_tem_login || session.isLogado()){
        //redirecionar 
    }
    */
    areaRestrita(redirecionar);
}
