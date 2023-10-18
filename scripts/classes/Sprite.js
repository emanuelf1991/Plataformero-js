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