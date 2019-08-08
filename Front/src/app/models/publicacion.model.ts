export class Publicacion {
    constructor(
        public _id: String,
        public idForo: String,
        public comentario: String,
        public nombreUsuario: String,
        public fecha: String
    ){}
}