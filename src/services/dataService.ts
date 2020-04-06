import { Idataservice } from "./Idataservice";
import { StorageCache } from "./StorageCache";
import { IUpdate } from "./IUpdate";

let items:any=[];
export default function MyService(): Idataservice {
  const cacheKey = "SubService";
  let mm:StorageCache =new StorageCache();
  let service = mm.get(cacheKey);  
  if(!service){
    service =new DataService();
    mm.set(cacheKey, service, 60*24*7);
  } 
     
  return service;
}
export  class DataService implements Idataservice {
  public observers:((update:IUpdate)=>any)[] = [];
  constructor() {
   this.observers=[]
    const allItems = JSON.parse(localStorage.getItem('myItems'));
    if (Array.isArray(allItems)) {
        items = allItems;
    }     
  }
  public addItem(item) {
    items.push(item);
    localStorage.setItem('myItems', JSON.stringify(items));
    this.notify(items);
  }
  public subscribe(callbackFunction:(update:IUpdate)=>any):void { 
    this.observers.push(callbackFunction);
 }
 
 public unsubscribe(callbackFunction:(update:IUpdate)=>any):void {
   this.observers.filter(o => o !== callbackFunction);
 }
 public notify(data?:IUpdate) {
   this.observers.forEach(o => {
     o(data);
   });
 }

}


export function  getItems():IUpdate {
  return items;
}
