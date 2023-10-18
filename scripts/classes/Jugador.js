class Jugador {
    constructor({ posicion, bloquesDeColision }) {
        this.posicion = posicion
        this.velocidad = {
            x: 0,
            y: 1
        };
        this.ancho = 25;
        this.altura = 25;
        this.bloquesDeColision = bloquesDeColision
    };

    dibujar() {
        c.fillStyle = 'red';
        c.fillRect(this.posicion.x ,this.posicion.y ,this.ancho , this.altura);
    };

    actualizar() {
        this.dibujar();

        this.posicion.x += this.velocidad.x;
        this.chekearPorColisionesHorizontales();
        this.aplicarGravedad();
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
                this.posicion.y = bloqueDeColision.posicion.y - this.altura - 0.01;
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