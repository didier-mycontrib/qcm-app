import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericMapCacheDataService {
  
    mapCacheData = new Map<string,any>();

    set(key:string, data:any){
      this.mapCacheData.set(key,data);
    }
    get(key:string,defaultValue:any=undefined) : any{
      return this.mapCacheData.get(key)??defaultValue;
    }
}
