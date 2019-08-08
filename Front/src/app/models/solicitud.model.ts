export class Solicitud {
    constructor(
        public emisorId: String,
        public emUsuario: String,
        public emImage: String,
        public receptorId: String,
        public estado: String
    ){}
}