export interface GenericCrudAbstractContextHelper<T>{

    essentielObjectString(obj : T) :string;
    buildEmptyObject() :T; //to code as return new T();
    getEntityTypeName():string ; //ex: return "Devise" or ...
    onGetAllObjects() : void; //ask findAll
    onSupprimerObject() : void ;
    onChangeSelectedObjectPostGeneric?() : void; //optional (post generic)
    onNewObjectPostGeneric?() : void ;//optional (post generic)
}