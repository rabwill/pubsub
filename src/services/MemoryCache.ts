interface IStoredValue {
    e: Date;
    v: any;
}

export  class MemoryCache {
  
    private prefix: string = 'ANZ_';
    private postfix: string = '';
    private expirationMinutes: number = 15;
    private storage: any;

    constructor(expirationMinutes?: number){
        if(typeof expirationMinutes === "number" && expirationMinutes >= 0){
            this.expirationMinutes = expirationMinutes;
        }
        const memCacheKey = `${this.prefix}MemCache`;
        if(!window[memCacheKey]){
            window[memCacheKey] = {};
        }
        this.storage = window[memCacheKey];
    }

    private getInternalKey(key:string): string {
        return this.prefix + key + this.postfix;
    }

    public  set(key:string, value:any, expire?:number|Date):void {
        let expiration:Date = new Date();
        if(expire instanceof Date){
            expiration = expire;
        }
        else if (typeof expire === "number") {
            // expiration = new Date();
            expiration.setSeconds(expiration.getUTCSeconds() + (expire * 60));
        }
        else {
            // expiration = new Date();
            expiration.setSeconds(expiration.getUTCSeconds() + (this.expirationMinutes * 60));
        }
        
        // don't create an entry if the cache is already expired
        const now = new Date();
        if (expiration > now) {
            const valueToStore = {
                e: expiration,
                v: value
            } as IStoredValue;
            this.storage[this.getInternalKey(key)] =  valueToStore;
        }
    }

    public get(key:string): any {
        const cachedObj = this.storage[this.getInternalKey(key)] as IStoredValue;
        if(!cachedObj) {
            return null;
        }
        try {
            if (cachedObj.e) {
                const isExpired = cachedObj.e < new Date();
                if (!isExpired) {
                    return cachedObj.v;
                }
                this.remove(key);
            }
        } catch (ex) {
            //ignore
        }
        
        return null;
    }

    public remove(key: string): void {
        this.storage[this.getInternalKey(key)] = undefined;
    }
}