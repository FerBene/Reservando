var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(el => el !== horarioReservado);
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}

function sumatoria(arrayDeNumeros) {
    var acumulador = 0 ;
    for (var i = 0; i < arrayDeNumeros.length; i++) {
        acumulador += arrayDeNumeros[i] ;
    }
    return acumulador ;
}

function promedio(arrayDeNumeros) {
    var promedio = sumatoria(arrayDeNumeros)/arrayDeNumeros.length;
    return Math.round(promedio * 10) / 10 ;
}