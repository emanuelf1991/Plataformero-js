function colision({objeto1, objeto2 }) {
    return (
        objeto1.posicion.y + objeto1.altura >= objeto2.posicion.y && 
        objeto1.posicion.y <= objeto2.posicion.y + objeto2.alto &&
        objeto1.posicion.x <= objeto2.posicion.x + objeto2.ancho &&
        objeto1.posicion.x + objeto1.ancho >= objeto2.posicion.x
    )
}