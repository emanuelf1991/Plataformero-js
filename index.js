const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let iniciar = false;

canvas.width = 1024;
canvas.height = 576;

const canvasEscalado = {
    width: canvas.width / 4,
    height: canvas.height / 4,
};

const colisionesPiso2D = [];
 for (let i = 0; i < colisionesPiso.length; i+= 36 ) {
    colisionesPiso2D.push(colisionesPiso.slice(i, i + 36))
 };

const colisionesDePlataformas2D = [];
for  (let i = 0; i < colisionesDePlataformas.length; i += 36) {
    colisionesDePlataformas2D.push(colisionesDePlataformas.slice(i, i + 36))
};

 const bloquesDeColision = [];
 colisionesPiso2D.forEach((row, y) => {
    row.forEach((Symbol, x) => {
       if(Symbol === 4784) {
        bloquesDeColision.push(new BloqueDeColision({posicion: {
            x: x * 16,
            y: y * 16, 
        },
    })
    )
       } 
    })
 });

 const bloquesDeColisionPlataformas = [];
 colisionesDePlataformas2D.forEach((row, y) => {
    row.forEach((Symbol, x) => {
       if(Symbol === 4784) {
        bloquesDeColisionPlataformas.push(new BloqueDeColision({posicion: {
            x: x * 16,
            y: y * 16, 
        },
    })
    )
   } 
  })
});


const gravedad = 0.5;


const jugador = new Jugador({
    posicion: {
        x: 100,
        y: 0
    },
    bloquesDeColision: bloquesDeColision,
    imageSrc: './assets/img/warrior/Idle/Idle-Sheet.png',
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
    posicion: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/img/backgrounds/background.png',
});

 
  function animar() {
    window.requestAnimationFrame(animar);
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(4, 4);
    c.translate(0, -background.imagen.height + canvasEscalado.height);
    background.actualizar();
    bloquesDeColision.forEach(bloquesDeColision => {
        bloquesDeColision.actualizar();
    })

    bloquesDeColisionPlataformas.forEach(bloquesDeColisionPlataformas => {
        bloquesDeColisionPlataformas.actualizar();
    });

    jugador.actualizar();

    jugador.velocidad.x = 0;
    if (teclas.d.apretada) jugador.velocidad.x = 5;
    else if (teclas.a.apretada) jugador.velocidad.x = -5;

    c.restore(); 
    
};

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
            jugador.velocidad.y = -8;
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

