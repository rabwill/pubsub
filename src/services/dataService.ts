let items = [];
let observers = [];
export default class DataService {
  constructor() {
    const allItems = JSON.parse(localStorage.getItem('myItems'));
    if (Array.isArray(allItems)) {
        items = allItems;
        notify(items);
    }     
  }
  public addItem(item) {
    items.push(item);
    localStorage.setItem('myItems', JSON.stringify(items));
    notify(items);
  }

}

export function subscribe(callbackFunction:(data:string[])=>any):void {
  console.log(observers);
   observers.push(callbackFunction);
}

export function unsubscribe(callbackFunction:(data:string[])=>any):void {
  observers.filter(o => o !== callbackFunction);
}
export function notify(data?:string[]) {
  observers.forEach(o => {
    o(data);
  });
}
export function  getItems():any {
  return items;
}
