class Jugador extends Sprite {
    constructor({ posicion, bloquesDeColision, imageSrc, frameRate, scale = 0.5}) {
        super({ imageSrc, frameRate, scale })
        this.posicion = posicion
        this.velocidad = {
            x: 0,
            y: 1
        };
        this.bloquesDeColision = bloquesDeColision
    };


    actualizar() {
        this.actualizarFrames();
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
        this.dibujar();

        this.posicion.x += this.velocidad.x;
        this.chekearPorColisionesHorizontales();
        this.aplicarGravedad ();
        this.chekearPorColisionesVerticales();
    };

    chekearPorColisionesHorizontales(){
        for (let i = 0; i < this.bloquesDeColision.length; i++) {
          const bloqueDeColision = this.bloquesDeColision[i];
           
          if (
            colision({
                objeto1: this,
                objeto2: bloqueDeColision,
            })
          ){

            if(this.velocidad.x > 0) {
                this.velocidad.x = 0;
                this.posicion.x = bloqueDeColision.posicion.x - this.ancho - 0.01;
                break;
            }

            if(this.velocidad.x < 0) {
                this.velocidad.x = 0;
                this.posicion.x = bloqueDeColision.posicion.x + bloqueDeColision.ancho  + 0.01;
                break;
            }
          };
        }
    };

    aplicarGravedad() {
        this.posicion.y += this.velocidad.y;
        this.velocidad.y += gravedad;
    };

    chekearPorColisionesVerticales(){
        for (let i = 0; i < this.bloquesDeColision.length; i++) {
          const bloqueDeColision = this.bloquesDeColision[i];
           
          if (
            colision({
                objeto1: this,
                objeto2: bloqueDeColision,
            })
          ){

            if(this.velocidad.y > 0) {
                this.velocidad.y = 0;
                this.posicion.y = bloqueDeColision.posicion.y - this.alto - 0.01;
                break;
            }

            if(this.velocidad.y < 0) {
                this.velocidad.y = 0;
                this.posicion.y = bloqueDeColision.posicion.y + bloqueDeColision.alto  + 0.01;
                break;
            }
          };
        };
    };
};