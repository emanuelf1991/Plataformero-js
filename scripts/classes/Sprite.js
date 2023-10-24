class Sprite {
    constructor({posicion, imageSrc, frameRate = 1 }) {
        this.posicion = posicion;
        this.imagen = new Image();
        this.imagen.onload = () => {
           this.ancho = this.imagen.width;
           this.alto = this.imagen.height;
        }
        this.imagen.src = imageSrc;
        this.frameRate = frameRate
    };

    dibujar() {
        if(!this.imagen) return;

        const cropbox = {
            posicion: {
              x: 0,
              y: 0,    
            },
            ancho: this.imagen.ancho / 4,
            alto: this.imagen.alto,
        };

        c.drawImage(
            this.imagen, 
            cropbox.posicion.x,
            cropbox.posicion.y,
            cropbox.ancho,
            cropbox.alto, 
            this.posicion.x, 
            this.posicion.y,
            this.ancho,
            this.alto
            );
    };

    actualizar(){
        this.dibujar();
    };
};