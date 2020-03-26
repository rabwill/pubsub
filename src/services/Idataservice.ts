export interface Idataservice {
    subscribe:(subscriber:(update:string[])=>any)=>void;
    unsubscribe:(subscriber:(update:string[])=>any)=>void;   
    addItem:(item:any)=>void;
   
}