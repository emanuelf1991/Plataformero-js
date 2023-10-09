const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let iniciar = false;

canvas.width = 1024;
canvas.height = 576;

const canvasEscalado = {
    width: canvas.width / 4,
    height: canvas.height / 4,
};

const gravedad = 0.5;

class Sprite {
    constructor({posision, imageSrc}) {
        this.posicion = posision;
        this.imagen = new Image();
        this.imagen.src = imageSrc
    };

    dibujar() {
        if(!this.imagen) return;
        c.drawImage(this.imagen, this.posicion.x, this.posicion.y);
    };

    actualizar(){
        this.dibujar();
    };
};



class Jugador {
    constructor(posicion) {
        this.posicion = posicion
        this.velocidad = {
            x: 0,
            y: 1
        };
        this.altura = 100;
    };

    dibujar() {
        c.fillStyle = 'red';
        c.fillRect(this.posicion.x ,this.posicion.y ,100 , this.altura);
    };

    actualizar() {
        this.dibujar();

        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;

        if(this.posicion.y + this.altura  +this.velocidad.y < canvas.height) 
            this.velocidad.y += gravedad;
        else this.velocidad.y = 0; 
    };
};

const jugador = new Jugador({
    x: 0,
    y: 0
});

const teclas = {
  d: {
    apretada: false,
  },
  a: {
    apretada: false,
  },  

};

const background = new Sprite({
    posision: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/img/backgrounds/background.png',
});

const imgMenu = new Sprite({
    posision: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/img/backgrounds/inicio.jpg',
});
 
  function animar() {
    window.requestAnimationFrame(animar);
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(4, 4);
    c.translate(0, -background.imagen.height + canvasEscalado.height);
    background.actualizar();
    c.restore();

    jugador.actualizar();

    jugador.velocidad.x = 0;
    if (teclas.d.apretada) jugador.velocidad.x = 5;
    else if (teclas.a.apretada) jugador.velocidad.x = -5;
    
};

do {
    let respuesta = prompt("Ingrese 'inicio' para comenzar").toLowerCase();
    if (respuesta == "inicio") {
        iniciar = true;
    }
  } while (iniciar == false);

// let respuesta = prompt("Ingrese 'inicio' para comenzar").toLowerCase();
// if (respuesta == "inicio") {
//     iniciar = true;
// }

 animar();

window.addEventListener('keydown', (event) =>{
    switch (event.key) {
        case 'd':
         teclas.d.apretada = true
        break;
        case 'a':
            teclas.a.apretada = true
        break;
        case 'w':
            jugador.velocidad.y = -15;
        break;
    };
});

window.addEventListener('keyup', (event) =>{
    switch (event.key) {
        case 'd':
         teclas.d.apretada = false
        break;
        case 'a':
            teclas.a.apretada = false
        break;
    };
});

