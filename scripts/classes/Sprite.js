class Sprite {
    constructor({
        posicion, 
        imageSrc, 
        frameRate = 1, 
        frameBuffer = 8, 
        scale = 1}) {
        this.posicion = posicion;
        this.scale = scale;
        this.imagen = new Image();
        this.imagen.onload = () => {
           this.ancho = (this.imagen.width  / this.frameRate)  * this.scale
           this.alto = this.imagen.height * this.scale
        }
        this.imagen.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    };

    dibujar() {
        if(!this.imagen) return;

        const cropbox = {
            posicion: {
              x: this.currentFrame * (this.imagen.width  / this.frameRate),
              y: 0,    
            },
            ancho: this.imagen.width / this.frameRate,
            alto: this.imagen.height ,
        };

        c.drawImage(
            this.imagen, 
            cropbox.posicion.x,
            cropbox.posicion.y,
            cropbox.ancho ,
            cropbox.alto , 
            this.posicion.x, 
            this.posicion.y,
            this.ancho ,
            this.alto
            );
    };

    actualizar(){
        this.dibujar();
        this.actualizarFrames();
    };

    actualizarFrames(){
        this.elapsedFrames++

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else this.currentFrame = 0; 
        }
    };
};