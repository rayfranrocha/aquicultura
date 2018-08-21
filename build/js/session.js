var sessao;
// var baseUrl = 'http://192.168.0.105:8080/netbarco-ws/api/siteCongresso/usuario';
var ambiente = {
    'localhost': "http://localhost:3000",
    'aquiculturanaamazonia.com.br':  'http://aquiculturanaamazonia.com.br',
    'www.aquiculturanaamazonia.com.br': 'http://www.aquiculturanaamazonia.com.br'
}
var location_ = ambiente[location.hostname];
// var indexSliceLocation = location.href.search(/[a-z]*.html$/;);
// var location_ = location.href.substring(0,indexSliceLocation-1);
jQuery.support.cors = true;
$(document).ready(function () {

    function logar(dados, callback) {
        window.localStorage.setItem('user', dados.id);
        window.localStorage.setItem('auth-token', dados.token);

        callback();
    }

    function deslogar(callback) {
       window.localStorage.removeItem('user');
       window.localStorage.removeItem('auth-token');
       callback();
    }
    
    function getDados() {
        return JSON.parse(decodeURIComponent(escape(window.atob( window.localStorage.getItem('auth-token').split('.')[1] ))));
    }

    function setRed(red) {
        window.localStorage.setItem('redirect', red);
    }
    function getRed() {
        return window.localStorage.getItem('redirect');
    }
    
    function isLogado() {
        return window.localStorage.getItem('auth-token');
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
function objetoRedirect() {
    return { id: '1', redirect: '' };
}
function areaRestrita(redirecionar) {
    if (sessao.isLogado()) {
        if (redirecionar === "inscricao") {
            window.location.href = location_ + '/inscricao.html#/home/passo1';
        }
        else if (redirecionar === "trabalhos") {
            window.location.href = location_ + '/trabalhos.html#/form';
        } 
        else if (redirecionar === "meusTrabalhos"){
            window.location.href = location_ + '/trabalhos.html#/list-trabalho';     
        }
        else {
            window.location.href = location_ + '/arearestrita.html';
        }
    } else {
        sessao.setRed(redirecionar); //Guardar para onde o usuário queria ir
        window.location.href = location_ + '/login.html';
    }
}
function showCadastro() {
    var esconder = document.getElementById('login-form');
    var mostrar = document.getElementById('cadastro-form');
    esconder.addEventListener("webkitAnimationEnd", function () {
        esconder.style.display = "none";

        mostrar.classList.add('in');
        mostrar.classList.remove('out');
        mostrar.style.display = "block";
    });
    esconder.addEventListener("animationend", function () {
        esconder.style.display = "none";
        mostrar.classList.add('in');
        mostrar.classList.remove('out');
        mostrar.style.display = "block";
    });
    esconder.classList.add('out');
}
function logout() {
    sessao.deslogar(function () {
        window.location.href = location_ + '/index.html';
    });
}
function login(event) {
    event.preventDefault();

    var cpf, senha, error;
    senha = document.getElementById('senha_log').value;
    cpf = document.getElementById('cpf_log').value;
    error = document.getElementById('erro_login');

    axios.post('/auth', {cpf: cpf.replace(/[\.\-]/g, ''),senha: senha})
        .then((response) => {
            sessao.logar(response.data, function () {
                var redirect = sessao.getRed().redirect;
                areaRestrita(redirect);
            });
        })
        .catch(error => {
            jQuery('#msg-error-login').text(error.response.data.message);
            jQuery('#error-login').show();
        });
}
function cadastrar(event, redirecionar) {
    event.preventDefault();
    var nomeElement, emailElement, senhaElement, confElement, cpfElement;
    var email, senha, confsenha, cpf;
    nomeElement = document.getElementById('nome_cad');
    emailElement = document.getElementById('email_cad');
    senhaElement = document.getElementById('senha_cad');
    confElement = document.getElementById('confsenha_cad');
    cpfElement = document.getElementById('cpf_cad');
    email = emailElement.value;
    senha = senhaElement.value;
    confsenha = confElement.value;
    cpf = cpfElement.value;
    var error = document.getElementById('erro_form');
    if (confsenha !== senha) {
        confElement.style.borderColor = 'red';
        senhaElement.style.borderColor = 'red';
        error.style.display = 'block';
        error.innerText = 'O campo confirmar senha está diferente do campo senha';
    } else {
        var jsonCadastro = {
            "nome": nomeElement.value,
            "email": email,
            "senha": senha,
            "cpf": cpf.replace(/[\.\-]/g, '')
        };

        axios.post('/usuario', jsonCadastro)
            .then((response) => {
                axios.post('/auth', {
                    cpf: jsonCadastro.cpf,
                    senha: senha
                })
                    .then((response) => {
                        sessao.logar(response.data, function () {
                            var redirect = sessao.getRed().redirect;
                            areaRestrita(redirect);
                        });
                    });
            })
    }
}
