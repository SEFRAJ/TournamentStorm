export class Torneo {
    constructor(
        public _id: String,
        public idUser: String,
        public nameUser: String,
        public nameTorneo: String,
        public descripcion: String,
        public tipo: Boolean,
        public costo: Number,
        public horario: Date,
        public jugo: String,
        public cantidad: Number,
        public fase: Number,
        public faseI: Number,
        public faseA: Number,
        public premioFinal: Number,
        public jugadores: [{id:string, nombre:string, puntosA: Number,puntosE: Number, go:Boolean}],
        public go: Boolean,
        public creativo: Boolean
    ){}
}