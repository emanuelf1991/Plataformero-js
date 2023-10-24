class BloqueDeColision {
    constructor({posicion }) {
        this.posicion = posicion;
        this.ancho = 16;
        this.alto = 16;
    };

    dibujar() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
    };

    actualizar(){
        this.dibujar();
    };
};