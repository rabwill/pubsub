import { Idataservice } from "./Idataservice";

let items = [];

export default class DataService implements Idataservice {
  public observers:((data:string[])=>any)[] = [];
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
  public subscribe(callbackFunction:(data:string[])=>any):void { 
    this.observers.push(callbackFunction);
 }
 
 public unsubscribe(callbackFunction:(data:string[])=>any):void {
   this.observers.filter(o => o !== callbackFunction);
 }
 public notify(data?:string[]) {
   this.observers.forEach(o => {
     o(data);
   });
 }

}


export function  getItems():any {
  return items;
}
