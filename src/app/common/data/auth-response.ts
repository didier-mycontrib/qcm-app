export class AuthResponse {
    constructor(
        public username : string ="",/*checked*/
        public status : boolean =false, /*true or false*/
        public message : string ="", /*error message or ...*/
        public token : string | null = null,/*jwt_or_not (to store or send-back as Bearer token)*/
        public roles : string ="",/*checked*/
    ){}
}