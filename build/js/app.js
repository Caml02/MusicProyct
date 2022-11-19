document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}


function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 0  ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="src/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;

    imagen.onclick = function() {
        mostrarImagen(i);
    }
    galeria.appendChild(imagen);
    }
}


function mostrarImagen(id) {
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="src/img/grande/${id}.jpg" alt="Imagen galeria">
        `;


        //Create Overlay with an Image / Crear overlay Con la Imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.add('pin-body');
            overlay.remove();
        }


        // Add botton close modal window / Boton para cerrar el Modal 
        const closeModal = document.createElement('P');
        closeModal.textContent = 'X';
        closeModal.classList.add('btn-cerrar');
        closeModal.onclick = function() {
            const body = document.querySelector('body');
            body.classList.add('pin-body');
            overlay.remove();
        }
        overlay.appendChild(closeModal);

        // Add to HTML /Añadir al HTML

        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('pin-body');      
}