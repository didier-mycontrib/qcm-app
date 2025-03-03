export class MenuDef{
    constructor(
        public label :string ="item-label-xy",
        public path :string | null  =null ,
        public children : MenuDef[] | null =null ,
        public expectedRole : string | null = null
        ){
    }
}