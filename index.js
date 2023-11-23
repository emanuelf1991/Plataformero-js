const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let personaje = "";
let nuevoEnemigo; // Agrega esta línea
const personajeGuardado = sessionStorage.getItem('personajeSeleccionado');

canvas.width = 1024;
canvas.height = 576;
canvas.style = "display:none";


const pantallaInicio = document.getElementById( 'pantalla-inicio' );
const imagenInicio = document.createElement('img');
imagenInicio.id = 'imagen-de-inicio';
imagenInicio.width = 1024;
imagenInicio.height = 576;

imagenInicio.src = './assets/img/backgrounds/earthblade.jpg';
pantallaInicio.appendChild(imagenInicio);

const mensajeInicio = document.createElement("p");
mensajeInicio.innerText = "Seleccione un personaje"
mensajeInicio.classList.add('mensaje-inicio');
pantallaInicio.appendChild(mensajeInicio);

const Wbutton = document.createElement('button'); 
Wbutton.type = 'button'; 
Wbutton.innerText = 'Guerrera'; 
Wbutton.classList.add('warrior-button');
Wbutton.onclick = startGameGuerrero;
pantallaInicio.appendChild(Wbutton);


const Kbutton = document.createElement('button'); 
Kbutton.type = 'button'; 
Kbutton.innerText = 'Caballero'; 
Kbutton.classList.add('knight-button');
Kbutton.onclick = startGameCaballero;
pantallaInicio.appendChild(Kbutton);


const HKbutton = document.createElement('button'); 
HKbutton.type = 'button'; 
HKbutton.innerText = 'Caballero Pesado'; 
HKbutton.classList.add('heavy-knight-button');
HKbutton.onclick = startGameCaballeroPesado;
pantallaInicio.appendChild(HKbutton);

document.body.appendChild(pantallaInicio);


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

const obtenerEnemigo = async () => {
    try {
      const resp = await fetch('./scripts/data/data.json');
      const data = await resp.json();
        
        nuevoEnemigo = new Jugador({
        posicion: {
        x: data.posicion.x,
        y: data.posicion.y,
        },
        bloquesDeColision: bloquesDeColision,
        imageSrc: data.imageSrc,
        frameRate: data.frameRate,
    }); 

    } catch (error) {
      console.error('Error al obtener enemigos:', error);
    }
  };
  
  obtenerEnemigo();


const gravedad = 0.5;

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

function seleccionarPersonaje(personaje){
    sessionStorage.setItem('personajeSeleccionado', personaje);
    switch (personaje) {
        case "guerrero":
             jugador = new Jugador({
            posicion: {
                x: 70,
                y: 0
            },
            bloquesDeColision: bloquesDeColision,
            imageSrc: './assets/img/warrior/Idle/Idle-Sheet.png',
            frameRate: 4,
        });
          break;
        case "caballero":
              jugador = new Jugador({
                posicion: {
                    x: 70,
                    y: 0
                },
                bloquesDeColision: bloquesDeColision,
                imageSrc: './assets/img/knight/Idle.png',
                frameRate: 8,
            });
          break;
        case "caballero-pesado":
             jugador = new Jugador({
                posicion: {
                    x: 70,
                    y: 0
                },
                bloquesDeColision: bloquesDeColision,
                imageSrc: './assets/img/heavyknight/Idle.png',
                frameRate: 10,
            });
            
          break;
      }
};


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
    
    if (nuevoEnemigo) {
        nuevoEnemigo.actualizar();
    }

    jugador.velocidad.x = 0;
    if (teclas.d.apretada) jugador.velocidad.x = 5;
    else if (teclas.a.apretada) jugador.velocidad.x = -5;

    c.restore(); 
    
};

 function startGameGuerrero(){
    toggleScreen ("imagen-de-inicio", false);
    toggleScreen ("canvas", true);
    seleccionarPersonaje("guerrero");
    Kbutton.style.display = "none";
    HKbutton.style.display = "none";
    Wbutton.style.display = "none";
    mensajeInicio.style.display = "none";
    animar();
 };

 function startGameCaballero(){
    toggleScreen ("imagen-de-inicio", false);
    toggleScreen ("canvas", true);
    seleccionarPersonaje("caballero");
    Kbutton.style.display = "none";
    HKbutton.style.display = "none";
    Wbutton.style.display = "none";
    mensajeInicio.style.display = "none";
    animar();
 };

 function startGameCaballeroPesado(){
    toggleScreen ("imagen-de-inicio", false);
    toggleScreen ("canvas", true);
    seleccionarPersonaje("caballero-pesado");
    Kbutton.style.display = "none";
    HKbutton.style.display = "none";
    Wbutton.style.display = "none";
    mensajeInicio.style.display = "none";
    animar();
 };

 if(personajeGuardado){
    console.log(personajeGuardado);
    toggleScreen ("imagen-de-inicio", false);
    toggleScreen ("canvas", true);
    seleccionarPersonaje(personajeGuardado);
    Kbutton.style.display = "none";
    HKbutton.style.display = "none";
    Wbutton.style.display = "none";
    mensajeInicio.style.display = "none";
    animar();
} 

 function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = ( toggle ) ? "block" : "none";
    element.style.display = display;
 };

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

