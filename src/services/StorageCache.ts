

export  class StorageCache {  
    private prefix: string = 'SAMPLE-SUB_';  
    private expirationMinutes: number = 60;
    private storage: any;

    constructor(expirationMinutes?: number){
        if(typeof expirationMinutes === "number" && expirationMinutes >= 0){
            this.expirationMinutes = expirationMinutes;
        }
        const memCacheKey = `${this.prefix}SubCache`;
        if(!window[memCacheKey]){
            window[memCacheKey] = {};
        }
        this.storage = window[memCacheKey];
    }

    private getInternalKey(key:string): string {
        return this.prefix + key;
    }

    public  set(key:string, value:any, expire?:number|Date):void {
        let expiration:Date = new Date();
        if(expire instanceof Date){
            expiration = expire;
        }
        else if (typeof expire === "number") {            
            expiration.setSeconds(expiration.getUTCSeconds() + (expire * 60));
        }
        else {       
            expiration.setSeconds(expiration.getUTCSeconds() + (this.expirationMinutes * 60));
        }      
    
        const now = new Date();
        if (expiration > now) {
            const valueToStore = {
                expiry: expiration,
                value: value
            } as IStoredKeyValue;
            this.storage[this.getInternalKey(key)] =  valueToStore;
        }
    }

    public get(key:string): any {
        const cachedObj = this.storage[this.getInternalKey(key)] as IStoredKeyValue;
        if(!cachedObj) {
            return null;
        }
        try {
            if (cachedObj.expiry) {
                const isExpired = cachedObj.expiry < new Date();
                if (!isExpired) {
                    return cachedObj.value;
                }
                this.remove(key);
            }
        } catch (ex) {           
        }
        
        return null;
    }

    public remove(key: string): void {
        this.storage[this.getInternalKey(key)] = undefined;
    }
}

interface IStoredKeyValue {
    expiry: Date;
    value: any;
}