var sessao;
// var baseUrl = 'http://192.168.0.105:8080/netbarco-ws/api/siteCongresso/usuario';
// var location_ = 'http://iconsti.com/aquicultura';
var indexSliceLocation = location.href.search(/[a-z]*.html$/);
var location_ = location.href.substring(0,indexSliceLocation-1);
jQuery.support.cors = true;
$(document).ready(function () {
    var db = new Dexie("dbusuario");
    var userSession = {};
    var userRedirect = {};
    db.version(1).stores({
        user: '&id,cpf,email',
        redirect: '&id'
    });
    db.version(2).stores({
        user: '&id,cpf',
        redirect: '&id'
    }).upgrade((tx) => {
        return tx.user.toCollection().modify(function (user) {
            delete user.email;
            delete user.nome;
        });
    });
    db.open().catch(function (e) {
        console.error("Open failed: " + e);
    });
    /*---Get para objeto de redirecionar---*/
    db.redirect.get('1')
        .then(function (res) {
            if (res === undefined) {
                db.redirect.put(objetoRedirect()).then(function () {
                    console.log('Criado redirect');
                    userRedirect = objetoRedirect();
                });
            } else {
                userRedirect = res;
            }
        });
    /*---Get para objeto de sessão---*/
    db.user.get('1')
        .then(function (res) {
            if (res === undefined) {
                db.user.put({ id: '1', isLogado: false, cpf: '' }).then(function () {
                    console.log('Criado');
                    userSession = { id: '1', isLogado: false, cpf: '' };
                });
            } else {
                userSession = res;
            }
        }).catch(function (err) {
            console.error('Failed to open db: ' + (err.stack || err));
        });
    function logar(dados, callback) {
        db.user.put({ id: dados.id, isLogado: true, cpf: dados.cpf, token: dados.token }).then(function () {
            userSession = { id: dados.id, isLogado: true, cpf: dados.cpf };
        })
            .then(function () {
                if (callback) {
                    callback();
                }
            })
    }
    function deslogar(callback) {
        db.user.put({ id: '1', isLogado: false, cpf: '' })
            .then(function () {
                if (callback) {
                    callback();
                }
            });
    }
    function getDados() {
        return userSession;
    }
    function setRed(red) {
        db.redirect.put({ id: '1', redirect: red }).then(function () {

        });
    }
    function getRed() {
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
function objetoRedirect() {
    return { id: '1', redirect: '' };
}
function areaRestrita(redirecionar) {
    if (sessao.isLogado()) {
        if (redirecionar === "inscricao") {
            window.location.href = location_ + '/inscricao.html';
        }
        else if (redirecionar === "trabalhos") {
            window.location.href = location_ + '/trabalhos.html';
        } else {
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
    //Chamar webservice com dados
    var dados__ = {
        login: cpf,
        senha: senha
    };
    var jsonTemp = {
        login: "00423864203"
    };

    axios.post('http://localhost:5000/auth', {
        cpf: cpf.replace(/[\.\-]/g, ''),
        senha: senha
    })
        .then((response) => {
            sessao.logar(response.data, function () {
                var redirect = sessao.getRed().redirect;
                areaRestrita(redirect);
            });
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
        var jsonTemp = {
            login: "00423864203"
        };

        axios.post('http://localhost:5000/usuario', jsonCadastro)
            .then((response) => {
                axios.post('http://localhost:5000/auth', {
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
