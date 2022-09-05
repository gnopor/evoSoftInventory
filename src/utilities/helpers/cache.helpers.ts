import { APP_NAME } from "../../constants";
import SecureLocalStorage from "./secureLocalStorage.helpers";

interface ICache {
    data: any;
    ttl: number;
}

export default class CacheHelpers {
    static memoryCache<TArgs extends unknown[], TResult>(
        fn: (...args: TArgs) => TResult,
        ttl = Infinity
    ) {
        const cache = new Map();

        return (...args: TArgs): TResult => {
            const key = fn.name + args.join();

            const cacheResult = cache.has(key) ? (cache.get(key) as ICache) : undefined;
            const isUpdate = (cacheResult?.ttl || Infinity) > Date.now();

            if (cacheResult && isUpdate) return cacheResult.data;

            const result = fn.apply(this, args);
            const newCache: ICache = { data: result, ttl: Date.now() + ttl };
            cache.set(key, newCache);

            return result;
        };
    }

    static storageCache<TArgs extends unknown[], TResult>(
        fn: (...args: TArgs) => TResult,
        ttl = Infinity
    ) {
        return async (...args: TArgs): Promise<TResult> => {
            const key = `c-${APP_NAME}-${fn.name}-${args.join()}`;

            const storageResult = SecureLocalStorage.getItem(key);
            const cacheResult = storageResult ? (JSON.parse(storageResult) as ICache) : undefined;
            const isUpdate = (cacheResult?.ttl || Infinity) > Date.now();

            if (cacheResult && isUpdate) return cacheResult.data;

            const result = await fn.apply(this, args);
            const newCache: ICache = { data: result, ttl: Date.now() + ttl };
            SecureLocalStorage.setItem(key, JSON.stringify(newCache));

            return result;
        };
    }
}
