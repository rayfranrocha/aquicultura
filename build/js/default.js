$(document).ready(function () {
    $("#carrosselInicio").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $("#carrosselParceiros").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 1000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    var buttonForScrollTop = document.getElementById('buttonForScrollTop');
    var navbar = document.getElementById('navbar');
    var showScroll = (buttonForScrollTop != undefined && buttonForScrollTop != null);
    if(navbar){
        $(window).scroll(function() {
            if($(this).scrollTop() > 200){
                if(showScroll){
                    buttonForScrollTop.style.display = "block";
                    buttonForScrollTop.classList.remove("out")
                    buttonForScrollTop.classList.add("in");
                }
                 navbar.classList.add("navbar-fixed-top");
            }else{
                if(showScroll){
                  buttonForScrollTop.style.display = "none";
                  buttonForScrollTop.classList.remove("in")
                  buttonForScrollTop.classList.add("out");
                }
                 navbar.classList.remove("navbar-fixed-top");
            }
        });
    }
    var btnVersaoParaPt = document.getElementById('btnVersaoParaPt');
    var btnVersaoParaEng = document.getElementById('btnVersaoParaEng');
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width <= 550) {
        /* -----TROCA POSIÇÃO BOTÕES----- */
        var botoesDiv = document.getElementById('botoesDiv');
        var btAnterior = document.getElementById('anterior');
        var btProximo = document.getElementById('proximo');
        if (btAnterior && btProximo && botoesDiv) {
            botoesDiv.removeChild(btAnterior);
            botoesDiv.appendChild(btAnterior);
        }
        /* --- TIRA IMAGEM DA PÁGINA PRINCIPAL */
        var img = document.getElementById('imgMapa');
        var btIrMapa = document.getElementById('btIrMapa');
        if(img){
            img.style.display = 'none';
            btIrMapa.style.display = 'block';
            document.getElementById('map').style.height = '15rem';
        }
    } 
    if(btnVersaoParaPt!= null && btnVersaoParaEng!=null){
        var textPortugues = document.getElementById('textPortugues');
        var textEnglish = document.getElementById('englishText');
        btnVersaoParaEng.addEventListener("click",function(){
            textPortugues.style.display = 'none';
            textEnglish.style.display = 'block';
        });
        btnVersaoParaPt.addEventListener("click",function(){
            textPortugues.style.display = 'block';
            textEnglish.style.display = 'none';
        });
    }
});
