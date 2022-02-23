export class AuthRequest {
    constructor(
        public username : string="" ,
        public password : string="",/*to check*/
        public roles : string=""/*asked roles (to check)*/
    ){}
}