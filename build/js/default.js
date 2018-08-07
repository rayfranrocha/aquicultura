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
    var navbar = document.getElementById('navbar');
    if(navbar){
        $(window).scroll(function() {
            if($(this).scrollTop() > 200){
                 navbar.classList.add("navbar-fixed-top");
            }else{
                 navbar.classList.remove("navbar-fixed-top");
            }
        });
    }
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
    }
}); 
