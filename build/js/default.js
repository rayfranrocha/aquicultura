$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
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
