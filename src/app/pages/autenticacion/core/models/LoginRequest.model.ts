export class LoginRequest{
    constructor(
        public usuario: string,
        public contrasenia: string,
        public token: string,
        public tokenCaptcha: string,
        public aplicaCaptcha: string
    ){}
}