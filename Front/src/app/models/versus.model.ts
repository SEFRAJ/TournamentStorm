export class Versus{
    constructor(
        public _id: String,
        public idCreador: String,
        public nombreCreador : String,
        public idRetador1 : String,
        public nombreRetador1 : String,
        public idRetador2: String,
        public nombreRetador2 : String,
        public nombreVersus: String,
        public tipoJuego: String,
        public tipoVersus: String,
        public valorEntrada: Number,
        public puntosRetador1: Number,
        public puntosRetador2: Number,
        public resultado: String,
        public nombreGanador: String,
        public estado: String
    ){}
}

