export class FaseTorneo {
    constructor(
        public _id: String,
        public idTorneo: String,
        public fase: Number,
        public jugadores:[],
        public resultados:[],
        public ganadores:[],
        public perdedores:[]
    ){}
}