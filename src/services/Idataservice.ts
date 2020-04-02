import { IUpdate } from "./IUpdate";

export interface Idataservice {
    subscribe:(subscriber:(update:IUpdate)=>any)=>void;
    unsubscribe:(subscriber:(update:IUpdate)=>any)=>void;   
    addItem:(item:any)=>void;
   
}